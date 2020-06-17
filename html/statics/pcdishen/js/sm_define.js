//算命
function submit_sm() {
    //解名输入验证
    var w = $("input[name='sword']");
    var word = w.val();
    var reg = /[^\u4E00-\u9FA5]/g;
    if (word.length > 4 || word.length < 2 || reg.test(word)) {
        layer.open({
            type: 1,
            title: false,
            skin: 'my_layers sm_layers',
            area: '360px',
            btn: '确定',
            shade: 0.3,
            shadeClose: false, //点击遮罩关闭
            content: '<div class="tctit">姓名请输入2~5个汉字</div>',
        });
        x.focus();
        return false;
    }
    if ($('.input-type').val() == '八字算命') {
        $('#smForm').attr('action','index.php?m=suanming&c=index&a=scbz');
    } else if ($('.input-type').val() == '称骨算命') {
        $('#smForm').attr('action','index.php?m=suanming&c=index&a=cgsm');
    } else if ($('.input-type').val() == '日干论命') {
        $('#smForm').attr('action','index.php?m=suanming&c=index&a=rglm');

    }
    $('#smForm').submit();
    return false;
}