# 浏览器解析css选择器的规则

举例

```<div id="div1">
    <div id="div2">
        <p class="p1"><span>1</span><span>2</span><span class="green">3</span></p>
        <p class="p1"><span>11</span><span class="red">11</span><span>11</span></p>
    </div>
    <div id="div3">
        <p><span>z</span><span>we</span><span>rewr</span></p>
        <p><span>z</span><span>we</span><span>rewr</span></p>
    </div>
    <div id="div4">
        <p><span>12</span><span>dwe</span><span>ef</span></p>
        <p><span>14</span><span>weef</span><span class="red">34123</span></p>
    </div>
</div>
```

选择器是 div div p.p1 span.red{color:red}，如果从左到右一层一层的筛选：首先会看到很多div被筛选出来，接下来筛选每一个div，首先在#div2中看到了class=p1的p，此时我们很是高兴，感觉胜利就在前方了，再看class=p1的p标签的子元素，看到第一个很是失望，不符合span.red，不要急，再看下一个又不符合规则，小小的安慰自己一下，最后一个含有class，说不定就是了，结果，结果居然class=green，此时火冒三丈，就差最后一层，怎奈居然出现这种事，无奈之下只能在返回#div2继续匹配它的子元素....

但如果我们换一个思路，首先匹配class=red 的 span，我们找到2个符合条件的的span然后在和上一次比对，我们需要的是span.red 是 p.p1的下属元素，此时就发现刚才筛选出来的第二个 span 元素不符合要求，再来匹配第一个，层层向上匹配，恭喜你，最终匹配成功，

**更为专业的解释：**

- HTML 经过解析生成 DOM Tree（这个我们比较熟悉）；而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。Render Tree 中的元素（WebKit 中称为「renderers」，Firefox 下为「frames」）与 DOM 元素相对应，但非一一对应：一个 DOM 元素可能会对应多个 renderer，如文本折行后，不同的「行」会成为 render tree 种不同的 renderer。也有的 DOM 元素被 Render Tree 完全无视，比如 display:none 的元素。
- 在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 renderer。对于每个 DOM 元素，必须在所有 Style Rules 中找到符合的 selector 并将对应的规则进行合并。选择器的「解析」实际是在这里执行的，在遍历 DOM Tree 时，从 Style Rules 中去寻找对应的 selector。
- 因为所有样式规则可能数量很大，而且绝大多数不会匹配到当前的 DOM 元素（因为数量很大所以一般会建立规则索引树），所以有一个快速的方法来判断「这个 selector 不匹配当前元素」就是极其重要的。
- 如果正向解析，例如「div div p em」，我们首先就要检查当前元素到 html 的整条路径，找到最上层的 div，再往下找，如果遇到不匹配就必须回到最上层那个 div，往下再去匹配选择器中的第一个 div，回溯若干次才能确定匹配与否，效率很低。
- 逆向匹配则不同，如果当前的 DOM 元素是 div，而不是 selector 最后的 em，那只要一步就能排除。只有在匹配时，才会不断向上找父节点进行验证。
- 但因为匹配的情况远远低于不匹配的情况，所以逆向匹配带来的优势是巨大的。同时我们也能够看出，在选择器结尾加上「*」就大大降低了这种优势，这也就是很多优化原则提到的尽量避免在选择器末尾添加通配符的原因。

