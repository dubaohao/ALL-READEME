#Spring-dubaohao
##1.DispatcherServlet
DispatcherServlet是前端控制器设计模式的实现，提供Spring Web MVC的集中访问点，而且负责职责的分派，而且与Spring IoC容器无缝集成，从而可以获得Spring的所有好处。
 
DispatcherServlet主要用作职责调度工作，本身主要用于控制流程，主要职责如下：
1、文件上传解析，如果请求类型是multipart将通过MultipartResolver进行文件上传解析；
2、通过HandlerMapping，将请求映射到处理器（返回一个HandlerExecutionChain，它包括一个处理器、多个HandlerInterceptor拦截器）；
3、  通过HandlerAdapter支持多种类型的处理器(HandlerExecutionChain中的处理器)；
4、通过ViewResolver解析逻辑视图名到具体视图实现；
5、本地化解析；
6、渲染具体的视图等；
7、如果执行过程中遇到异常将交给HandlerExceptionResolver来解析。