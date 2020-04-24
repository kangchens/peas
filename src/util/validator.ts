//登陆表单验证
export const loginForms = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        {required: true, message: '请输入数字', trigger: 'blur' }
    ],
}