$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登陆！');
            $('#link_login').click()
        })
    })
    //     $('#form_login').on('submit', function (e) {
    //         e.preventDefault()
    //         let data = { username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val() }
    //         $.post('/api/login', data, function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg(res.message)
    //             }
    //             layer.msg('登陆成功')
    //         })
    // })
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})
