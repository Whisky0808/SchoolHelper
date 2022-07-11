const data = require("./allSchool");
const zhenzisms = require("../../../common/zhenzisms.js");
const app = getApp();
Page({

    data: {
        //验证码
        btnValue: '获取验证码',
        btnDisabled: false,
        second: 60,
        status: false,
        code: '',
        realCode: '123',

        error: '',

        imgUrl: '/static/img/info_bg.png',
        addressData: {
            province: ['请输入省份'],
            city: ['请输入城市'],
            school: ['请输入学校'],
            provinceIndex: 0,
            cityIndex: 0,
            schoolIndex: 0,
            name: '',
            num: '',
            celephone: ''
        },
        answer: {
            province: '',
            city: '',
            school: '',
            name: '',
            num: '',
            celephone: '',
            code: ''
        }

    },
    onLoad: function () {
        console.log('开始');
        console.log(app.globalData);
        this.mounted();
    },

    mounted: function () {
        let info1 = []
        for (let i = 0; i < data.province.length; i++) {
            info1.push(data.province[i][1])
        }
        let addProvince = "addressData.province"
        this.setData({
            [addProvince]: info1
        })
        console.log(this.data.addressData.province)
    },

    //缩略了！
    //提交
    // confirm: function () {
    //     this.data.answer.province = this.data.addressData.province[this.data.addressData.provinceIndex]
    //     this.data.answer.city = this.data.addressData.city[this.data.addressData.cityIndex]
    //     this.data.answer.school = this.data.addressData.school[this.data.addressData.schoolIndex]
    //     this.data.answer.name = this.data.addressData.name
    //     this.data.answer.num = this.data.addressData.num
    //     this.data.answer.celephone = this.data.addressData.celephone
    //     let ans = this.data.answer
    //     console.log(JSON.stringify(ans))
    //     // 返回object
    // },

    bindSchoolChange: function (e) {
        let addSch = "addressData.schoolIndex"
        this.setData({
            [addSch]: e.detail.value
        })
        // console.log(this.data.addressData.schoolIndex);
        // console.log( this.data.addressData.school[e.detail.value]);
    },
    bindCityChange: function (e) {
        let info,
            info1 = [],
            info2 = [],
            info3 = []
        let addCity = "addressData.cityIndex"
        this.setData({
            [addCity]: e.detail.value
        })
        info = data.province[this.data.addressData.provinceIndex][0] // 省编号,取第一列
        info1 = data.city[info][this.data.addressData.cityIndex]
        info2 = data.allschool[info1[0]]
        console.log(info1)
        for (let i = 0; i < info2.length; i++) {
            info3.push(info2[i][2])
        }
        console.log(info3);
        let addSchool = "addressData.school"
        this.setData({
            [addSchool]: info3
        })
        // console.log(this.data.addressData.school);

    },
    bindProvinceChange: function (e) {
        console.log(e);
        let info2, info3 = []
        let addPro = "addressData.provinceIndex"
        this.setData({
            [addPro]: e.detail.value
        })
        // console.log(data.province[this.data.addressData.provinceIndex][0]) // 省编号
        info2 = data.city[data.province[this.data.addressData.provinceIndex][0]]
        console.log(info2)
        for (let i = 0; i < info2.length; i++) {
            info3.push(info2[i][1])
        }
        let addCity = "addressData.city"
        this.setData({
            [addCity]: info3
        })
        console.log(this.data.addressData.city);

    },
    //缩略了
    // 绑定手机号

    // inputName: function (e) {

    //     this.data.addressData.name= e.detail.value

    // },
    // inputNum: function (e) {

    //     this.data.addressData.num= e.detail.value

    // },
    // inputCele: function (e) {

    //     this.data.addressData.celephone= e.detail.value

    // },


    //提交
    formSubmit: function (e) {
        let that = this;
        let edv = e.detail.value;

        this.data.answer.province = this.data.addressData.province[this.data.addressData.provinceIndex]
        this.data.answer.city = this.data.addressData.city[this.data.addressData.cityIndex]
        this.data.answer.school = this.data.addressData.school[this.data.addressData.schoolIndex]
        this.data.answer.name = edv.name
        this.data.answer.num = edv.num
        this.data.answer.celephone = edv.celePhone
        this.data.answer.code = edv.code
        console.log(edv.code);
        console.log("输入的code=", that.data.answer.code);
        console.log(this.data.realCode);
        // console.log("!!!  "+app.globalData.userInfo.openid);
        console.log(app.globalData);
        if (edv.code == this.data.realCode) {
            console.log("验证码正确");
            let ans = that.data.answer
            console.log(JSON.stringify(ans))
            console.log(that.data.answer.name+'# '+that.data.answer.num+'# '+app.globalData.userInfo.openid+'# '+that.data.answer.school+'# '+that.data.answer.celephone)
            wx.request({
                url: 'https://zzxdream.cn1.utools.club/student/certificate',
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                data: {
                    studentName: that.data.answer.name,
                    studentNumber: that.data.answer.num,
                    openid: app.globalData.userInfo.openid,
                    schoolName: that.data.answer.school,
                    studentPhone: that.data.answer.celephone,
                },
                success: function (res) {
                    console.log(res);
                    app.globalData.userInfo.realName = res.data.data.realName;
                    app.globalData.userInfo.schoolId = res.data.data.schoolId;
                    app.globalData.userInfo.schoolName = res.data.data.schoolName;
                    app.globalData.userInfo.phone = res.data.data.phone;
                    if (res.data.flag == true && res.data.code == 200) {
                        wx.navigateTo({
                            // url: '../welcome/welcome'
                            url: '../drawCoupon/drawCoupon'
                        })
                        console.log("验证成功");

                    } else if (res.data.flag == false && res.data.code == 201) {

                        that.setData({
                            error: res.data.message,
                        })
                        console.log("验证失败");

                    }
                }
            })
        }



    },

    confirmCele: function (e) {
        console.log(e.detail.value);
        let val = e.detail.value;
        let addressData_celephone = "addressData.celephone"
        this.setData({
            [addressData_celephone]: val
        })
        console.log(typeof (this.data.addressData.celephone));
        if (val != '') {
            this.setData({
                btnDisabled: false,
                btnValue: '获取验证码'
            })
        } else {
            this.setData({
                btnDisabled: true
            })
        }
    },

    //验证码
    getCode(e) {
        console.log(e);
        console.log('获取验证码ing');
        let that = this;
        //这个是初始化配置
        //第一个参数是短信平台的网址
        //第二个和第三个是我账号秘钥
        zhenzisms.client.init('https://sms_developer.zhenzikj.com', '108580', '3d2e5830-2ed3-4c4b-be2d-0a0e134c011c');
        //把参数都存在下面这个 params 里面
        let params = {
            number: ''
        };
        console.log(that.data.addressData.celephone);
        //手机号码要从用户输入框获取，这边我写死是为了方便测试
        params.number = that.data.addressData.celephone;
        console.log(params.number);
        console.log(typeof (params.number));

        //下面这个 '4446'是短信模板id，先用他就行，不能更改
        params.templateId = '4446';
        //下面生成的code就是要发送给用户的验证码，用户输出验证码后跟生成的code做比较，一样则验证通过
        let code = zhenzisms.client.createCode(4, 60, params.number); //生成验证码
        //将真验证码存起来，用来验证
        this.setData({
            realCode: code
        })
        console.log("real验证码 = ", code)
        //设置验证码一分钟内有效
        let templateParams = [code, '1分钟'];
        params.templateParams = templateParams;
        // params.messageId = '1111111';  //可不选，短信的唯一标识
        // params.clientIp = '221.221.221.111';   //可不选，
        zhenzisms.client.send(function (res) {
            console.log(res)
            //成功发送短信返回状态码 0
            if (res.data.code == 0) {
                //开始倒计时，60s后可重新发送，并将验证码设置为有效期内
                that.setData({
                    status: true
                })
                that.timer();
                return;
            }
            wx.showToast({
                title: res.data.data,
                icon: 'none',
                duration: 2000
            })
        }, params);

    },

    timer: function () {
        //箭头函数 this没变
        let promise = new Promise((resolve, reject) => {
            let setTimer = setInterval(
                () => {
                    console.log("我进来啦")
                    let second = this.data.second - 1;
                    this.setData({
                        second: second,
                        btnValue: second + '秒',
                        btnDisabled: true
                    })
                    if (this.data.second <= 0) {
                        this.setData({
                            second: 60,
                            btnValue: '获取验证码',
                            btnDisabled: false
                        })
                        resolve(setTimer)
                    }
                    if (second == 0) {
                        this.setData({
                            status: false //时间到了
                        })
                        console.log("时间到了，验证码失效了");
                    }
                }, 1000)
        })
        promise.then((setTimer) => {
            clearInterval(setTimer)
        })
    },


});