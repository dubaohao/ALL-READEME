#微信支付
##bestPay第三方
```

	package com.example.travel.service;
	
	import com.example.travel.dao.TOrder;
	import com.lly835.bestpay.model.PayResponse;
	import com.lly835.bestpay.model.RefundResponse;
	
	public interface PayService {
	    PayResponse create (TOrder tOrder);
	    PayResponse notify(String notifyData);
	    RefundResponse refund(TOrder tOrder);
	}

```
```

	package com.example.travel.service.impl;
	
	import com.example.travel.dao.TOrder;
	import com.example.travel.enums.ResultEnum;
	import com.example.travel.exception.TravelException;
	import com.example.travel.service.OrderService;
	import com.example.travel.service.PayService;
	import com.example.travel.utils.JsonUtil;
	import com.example.travel.utils.MathUtil;
	import com.lly835.bestpay.enums.BestPayTypeEnum;
	import com.lly835.bestpay.model.PayRequest;
	import com.lly835.bestpay.model.PayResponse;
	import com.lly835.bestpay.model.RefundRequest;
	import com.lly835.bestpay.model.RefundResponse;
	import com.lly835.bestpay.service.BestPayService;
	import com.lly835.bestpay.service.impl.BestPayServiceImpl;
	import lombok.extern.slf4j.Slf4j;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	@Service
	@Slf4j
	public class PayServiceImpl implements PayService {
	
	    private static final String ORDER_NAME = "微信订单";
	    @Autowired
	    private BestPayServiceImpl bestPayService;
	    @Autowired
	    private OrderService orderService;
	
	    @Override
	    public PayResponse create(TOrder tOrder) {
	        PayRequest payRequest = new PayRequest();
	        payRequest.setOpenid(tOrder.getWx());                                       //注意：和数据库对应关系不一致
	        payRequest.setOrderAmount(tOrder.getMoney().doubleValue());              //注意：和数据库对应关系不一致
	        payRequest.setOrderId(tOrder.getOrderNumber());                             //注意：和数据库对应关系不一致
	        payRequest.setOrderName(ORDER_NAME);
	        payRequest.setPayTypeEnum(BestPayTypeEnum.WXPAY_H5);
	        log.info("【微信支付】发起支付, request={}", JsonUtil.toJson(payRequest));
	
	        PayResponse payResponse = bestPayService.pay(payRequest);
	        log.info("【微信支付】发起支付, response={}", JsonUtil.toJson(payResponse));
	        return payResponse;
	    }
	    @Override
	    public PayResponse notify(String notifyData) {
	        //1. 验证签名
	        //2. 支付的状态
	        //3. 支付金额
	        //4. 支付人(下单人 == 支付人)
	
	        PayResponse payResponse = bestPayService.asyncNotify(notifyData);
	        log.info("【微信支付】异步通知, payResponse={}", JsonUtil.toJson(payResponse));
	
	        //查询订单
	        TOrder tOrder = orderService.findOrderNumber(payResponse.getOrderId());
	
	        //判断订单是否存在
	        if (tOrder == null) {
	            log.error("【微信支付】异步通知, 订单不存在, orderId={}", payResponse.getOrderId());
	            throw new TravelException(ResultEnum.ORDER_NOT_EXIST);
	        }
	
	        //判断金额是否一致(0.10   0.1)
	        if (!MathUtil.equals(payResponse.getOrderAmount(), tOrder.getMoney().doubleValue())) {
	            log.error("【微信支付】异步通知, 订单金额不一致, orderId={}, 微信通知金额={}, 系统金额={}",
	                    payResponse.getOrderId(),
	                    payResponse.getOrderAmount(),
	                    tOrder.getMoney());
	            throw new TravelException(ResultEnum.WXPAY_NOTIFY_MONEY_VERIFY_ERROR);
	        }
	
	        //修改订单的支付状态
	        tOrder.setOrderStatus("已支付");
	        orderService.paid(tOrder);
	
	        return payResponse;
	    }
	
	    /**
	     * 退款
	     * @param tOrder
	     */
	    @Override
	    public RefundResponse refund(TOrder tOrder) {
	        RefundRequest refundRequest = new RefundRequest();
	        refundRequest.setOrderId(tOrder.getOrderNumber());
	        refundRequest.setOrderAmount(tOrder.getMoney().doubleValue());
	        refundRequest.setPayTypeEnum(BestPayTypeEnum.WXPAY_H5);
	        log.info("【微信退款】request={}", JsonUtil.toJson(refundRequest));
	
	        RefundResponse refundResponse = bestPayService.refund(refundRequest);
	        log.info("【微信退款】response={}", JsonUtil.toJson(refundResponse));
	
	        return refundResponse;
	    }
	}

```
```

	package com.example.travel.controller;
	
	import com.example.travel.configWeChatSDK.MyConfig;
	import com.example.travel.dao.TOrder;
	import com.example.travel.enums.ResultEnum;
	import com.example.travel.exception.TravelException;
	import com.example.travel.service.OrderService;
	import com.example.travel.service.PayService;
	import com.example.travel.utils.JsonUtil;
	import com.example.travel.utils.WeChatParamUtil;
	import com.github.binarywang.wxpay.bean.notify.WxPayNotifyResponse;
	import com.github.binarywang.wxpay.bean.notify.WxPayOrderNotifyResult;
	import com.github.binarywang.wxpay.bean.notify.WxPayRefundNotifyResult;
	import com.github.binarywang.wxpay.bean.order.WxPayMpOrderResult;
	import com.github.binarywang.wxpay.bean.request.WxPayRefundRequest;
	import com.github.binarywang.wxpay.bean.request.WxPayUnifiedOrderRequest;
	import com.github.binarywang.wxpay.bean.result.WxPayOrderCloseResult;
	import com.github.binarywang.wxpay.bean.result.WxPayRefundResult;
	import com.github.binarywang.wxpay.bean.result.WxPayUnifiedOrderResult;
	import com.github.binarywang.wxpay.exception.WxPayException;
	import com.github.binarywang.wxpay.service.WxPayService;
	import com.lly835.bestpay.model.PayResponse;
	import lombok.extern.slf4j.Slf4j;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Controller;
	import org.springframework.ui.Model;
	import org.springframework.web.bind.annotation.CrossOrigin;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestParam;
	import org.springframework.web.servlet.ModelAndView;
	
	import java.math.BigDecimal;
	import java.util.HashMap;
	import java.util.Map;
	
	
	@CrossOrigin
	@Controller
	@RequestMapping("/pay")
	@Slf4j
	public class PayController {
	
	    @Autowired
	    private OrderService orderService;
	
	//    @Autowired
	//    private PayService payService;
	
	    @Autowired
	    private MyConfig myConfig;
	
	    @Autowired
	    private WxPayService wxPayService;
	
	//    @GetMapping("/bestPay/create")
	//    public ModelAndView create(@RequestParam("orderNumber") String orderNumber,
	//                               @RequestParam("returnUrl") String returnUrl,
	//                               Map<String, Object> map){
	//        /**1.查询订单*/
	//        TOrder tOrder=orderService.findOrderNumber(orderNumber);
	//        System.out.println(tOrder);
	//        if(tOrder==null){
	//            throw new TravelException(ResultEnum.ORDER_NOT_EXIST);
	//        }
	//        //发起支付
	//        PayResponse payResponse = payService.create(tOrder);
	//System.out.println("response");
	//        System.out.println(payResponse);
	//        map.put("payResponse", payResponse);
	//        map.put("returnUrl", returnUrl);
	//
	//        return new ModelAndView("pay/create", map);
	//    }
	
	    /**
	     * 微信异步通知
	     * @param notifyData
	     */
	//    @PostMapping("/bestPay/notify")
	//    public ModelAndView bestPayNotify(@RequestBody String notifyData) {
	//        payService.notify(notPifyData);
	//
	//        //返回给微信处理结果
	//        return new ModelAndView("pay/success");
	//    }
	    /**
	     * 微信退款Refund
	     * @param
	     */
	//    @GetMapping("/bestPay/refund")
	//    public String bestPayRefund(){
	//        TOrder tOrder=orderService.findOrderNumber("DD1541731342955767893");
	//        payService.refund(tOrder);
	//        return "success";
	//    }
	
	    @GetMapping("/createOrder")
	    public ModelAndView createOrder(@RequestParam("orderNumber") String orderNumber,
	                             @RequestParam("returnUrl") String returnUrl
	                            ) throws WxPayException{
	        /**1.查询订单*/
	        TOrder tOrder=orderService.findOrderNumber(orderNumber);
	        System.out.println(tOrder);
	        if(tOrder==null){
	            throw new TravelException(ResultEnum.ORDER_NOT_EXIST);
	        }
	//        wxPayService.setConfig(myConfig);
	        //发起支付
	            WxPayUnifiedOrderRequest wxPayUnifiedOrderRequest = new WxPayUnifiedOrderRequest();
	            wxPayUnifiedOrderRequest.setOpenid(tOrder.getWx());
	            wxPayUnifiedOrderRequest.setTradeType("JSAPI");
	            wxPayUnifiedOrderRequest.setNotifyUrl("http://dubaohao.natapp1.cc/pay/notify");
	            wxPayUnifiedOrderRequest.setTotalFee(Integer.valueOf(String.valueOf(tOrder.getMoney().multiply(new BigDecimal(100)).intValue())));
	            wxPayUnifiedOrderRequest.setBody("dubaohao微信官方SDK订单test");
	//        wxPayUnifiedOrderRequest.setNonceStr("bfrhncjkfdkfd");
	            wxPayUnifiedOrderRequest.setSpbillCreateIp(WeChatParamUtil.ip());
	
	            wxPayUnifiedOrderRequest.setOutTradeNo(tOrder.getOrderNumber());
	
	            log.info("发起微信支付SDK下单接口, request={}", JsonUtil.toJson(wxPayUnifiedOrderRequest));
	
	
	        /*获取到APPId，timeStamp,nonceStr,packAgeValue,paySign*/
	        WxPayMpOrderResult wxPayMpOrderResult=wxPayService.createOrder(wxPayUnifiedOrderRequest);
	        /*可以获取到prePayId,codeUrl,MwebUrl,TradeRype等等*/
	//        WxPayUnifiedOrderResult wxPayUnifiedOrderResult= wxPayService.unifiedOrder(wxPayUnifiedOrderRequest);
	
	        log.info("发起微信SDK支付下单接口, result={}", JsonUtil.toJson(wxPayMpOrderResult));
	
	        Map<String,String>map = new HashMap<String, String>();
	        map.put("appId",wxPayMpOrderResult.getAppId());
	        map.put("timeStamp", wxPayMpOrderResult.getTimeStamp());
	        map.put("nonceStr", wxPayMpOrderResult.getNonceStr());
	        map.put("packAgeValue", wxPayMpOrderResult.getPackageValue());
	        map.put("paySign",wxPayMpOrderResult.getPaySign());
	        map.put("returnUrl", returnUrl);
	//        log.info("发起微信支付下单接口, map={}", JsonUtil.toJson(map));
	
	        return new ModelAndView("pay/createSDK", map);
	    }
	
	    @PostMapping("/notify")
	//    public ModelAndView notifys()throws WxPayException{
	//      public ModelAndView notifys(@RequestBody String xmlData)throws WxPayException{
	      public String parseOrderNotifyResult(@RequestBody String xmlData)throws WxPayException{
	
	        log.info("支付回调通知");
	//      log.info("回调通知！！！！！！xmlData={}",xmlData);
	
	      WxPayOrderNotifyResult notifyResult = wxPayService.parseOrderNotifyResult(xmlData);
	      log.info("回调通知！！！！！！notifyResult={}",notifyResult);
	
	      TOrder tOrder=orderService.findOrderNumber(notifyResult.getOutTradeNo()) ;
	        //判断订单是否存在
	        if (tOrder == null) {
	            log.error("【微信支付】异步通知, 订单不存在, orderId={}", notifyResult.getOutTradeNo());
	            throw new TravelException(ResultEnum.ORDER_NOT_EXIST);
	        }
	
	      return WxPayNotifyResponse.success("成功");//总是回调好多次，xmldata不存在return_msg字段
	//        return new ModelAndView("pay/success");
	    }
	    @GetMapping("/refund")
	    public WxPayRefundResult refund(@RequestParam("orderNumber") String orderNumber,
	                                    @RequestParam("returnUrl") String returnUrl) throws WxPayException {
	        /**1.查询订单*/
	        TOrder tOrder=orderService.findOrderNumber(orderNumber);
	
	        WxPayRefundRequest wxPayRefundRequest = new WxPayRefundRequest();
	        wxPayRefundRequest.setOutRefundNo(tOrder.getOrderNumber());
	        wxPayRefundRequest.setRefundFee(Integer.valueOf(String.valueOf(tOrder.getMoney().multiply(new BigDecimal(100)).intValue())));
	        wxPayRefundRequest.setOutTradeNo(tOrder.getOrderNumber());
	        wxPayRefundRequest.setTotalFee(Integer.valueOf(String.valueOf(tOrder.getMoney().multiply(new BigDecimal(100)).intValue())));
	        log.info("退款信息：{}",wxPayService.refund(wxPayRefundRequest));
	        return wxPayService.refund(wxPayRefundRequest);
	    }
	    @PostMapping("/notify/refund")
	    public ModelAndView notifysRefund(@RequestBody String xmlData)throws WxPayException{
	//    public String parseOrderNotifyResult(@RequestBody String xmlData)throws WxPayException{
	        log.info("退款回调通知！！！！！！xmlData={}",xmlData);
	        WxPayRefundNotifyResult notifyResult = wxPayService.parseRefundNotifyResult(xmlData);
	        notifyResult.get
	        log.info("退款回调通知！！！！！！notifyResult={}",notifyResult);
	//        return WxPayNotifyResponse.success("成功");
	        return new ModelAndView("pay/success");
	    }
	
	}

```
