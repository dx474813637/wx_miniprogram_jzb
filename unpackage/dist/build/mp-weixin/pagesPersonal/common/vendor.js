(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesPersonal/common/vendor"],{"0f14":function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cityData2=e.cityData=void 0;var u=[{value:"110000",label:"北京",children:[{value:"1",label:"北京"}]},{value:"120000",label:"天津",children:[{value:"1",label:"天津"}]},{value:"130000",label:"河北",children:[{value:"130100",label:"石家庄"},{value:"130200",label:"唐山"},{value:"130300",label:"秦皇岛"},{value:"130400",label:"邯郸"},{value:"130500",label:"邢台"},{value:"130600",label:"保定"},{value:"130700",label:"张家口"},{value:"130800",label:"承德"},{value:"130900",label:"沧州"},{value:"131000",label:"廊坊"},{value:"131100",label:"衡水"}]},{value:"140000",label:"山西",children:[{value:"140100",label:"太原"},{value:"140200",label:"大同"},{value:"140300",label:"阳泉"},{value:"140400",label:"长治"},{value:"140500",label:"晋城"},{value:"140600",label:"朔州"},{value:"140700",label:"晋中"},{value:"140800",label:"运城"},{value:"140900",label:"忻州"},{value:"141000",label:"临汾"},{value:"141100",label:"吕梁"}]},{value:"150000",label:"内蒙古",children:[{value:"150100",label:"呼和浩特"},{value:"150200",label:"包头"},{value:"150300",label:"乌海"},{value:"150400",label:"赤峰"},{value:"150500",label:"通辽"},{value:"150600",label:"鄂尔多斯"},{value:"150700",label:"呼伦贝尔"},{value:"150800",label:"巴彦淖尔"},{value:"150900",label:"乌兰察布"},{value:"152200",label:"兴安盟"},{value:"152500",label:"锡林郭勒盟"},{value:"152900",label:"阿拉善盟"}]},{value:"210000",label:"辽宁",children:[{value:"210100",label:"沈阳"},{value:"210200",label:"大连"},{value:"210300",label:"鞍山"},{value:"210400",label:"抚顺"},{value:"210500",label:"本溪"},{value:"210600",label:"丹东"},{value:"210700",label:"锦州"},{value:"210800",label:"营口"},{value:"210900",label:"阜新"},{value:"211000",label:"辽阳"},{value:"211100",label:"盘锦"},{value:"211200",label:"铁岭"},{value:"211300",label:"朝阳"},{value:"211400",label:"葫芦岛"}]},{value:"220000",label:"吉林",children:[{value:"220100",label:"长春"},{value:"220200",label:"吉林"},{value:"220300",label:"四平"},{value:"220400",label:"辽源"},{value:"220500",label:"通化"},{value:"220600",label:"白山"},{value:"220700",label:"松原"},{value:"220800",label:"白城"},{value:"222400",label:"延边朝鲜族自治州"}]},{value:"230000",label:"黑龙江",children:[{value:"230100",label:"哈尔滨"},{value:"230200",label:"齐齐哈尔"},{value:"230300",label:"鸡西"},{value:"230400",label:"鹤岗"},{value:"230500",label:"双鸭山"},{value:"230600",label:"大庆"},{value:"230700",label:"伊春"},{value:"230800",label:"佳木斯"},{value:"230900",label:"七台河"},{value:"231000",label:"牡丹江"},{value:"231100",label:"黑河"},{value:"231200",label:"绥化"},{value:"232700",label:"大兴安岭地区"}]},{value:"310000",label:"上海",children:[{value:"1",label:"上海"}]},{value:"320000",label:"江苏",children:[{value:"320100",label:"南京"},{value:"320200",label:"无锡"},{value:"320300",label:"徐州"},{value:"320400",label:"常州"},{value:"320500",label:"苏州"},{value:"320600",label:"南通"},{value:"320700",label:"连云港"},{value:"320800",label:"淮安"},{value:"320900",label:"盐城"},{value:"321000",label:"扬州"},{value:"321100",label:"镇江"},{value:"321200",label:"泰州"},{value:"321300",label:"宿迁"}]},{value:"330000",label:"浙江",children:[{value:"330100",label:"杭州"},{value:"330200",label:"宁波"},{value:"330300",label:"温州"},{value:"330400",label:"嘉兴"},{value:"330500",label:"湖州"},{value:"330600",label:"绍兴"},{value:"330700",label:"金华"},{value:"330800",label:"衢州"},{value:"330900",label:"舟山"},{value:"331000",label:"台州"},{value:"331100",label:"丽水"}]},{value:"340000",label:"安徽",children:[{value:"340100",label:"合肥"},{value:"340200",label:"芜湖"},{value:"340300",label:"蚌埠"},{value:"340400",label:"淮南"},{value:"340500",label:"马鞍山"},{value:"340600",label:"淮北"},{value:"340700",label:"铜陵"},{value:"340800",label:"安庆"},{value:"341000",label:"黄山"},{value:"341100",label:"滁州"},{value:"341200",label:"阜阳"},{value:"341300",label:"宿州"},{value:"341500",label:"六安"},{value:"341600",label:"亳州"},{value:"341700",label:"池州"},{value:"341800",label:"宣城"}]},{value:"350000",label:"福建",children:[{value:"350100",label:"福州"},{value:"350200",label:"厦门"},{value:"350300",label:"莆田"},{value:"350400",label:"三明"},{value:"350500",label:"泉州"},{value:"350600",label:"漳州"},{value:"350700",label:"南平"},{value:"350800",label:"龙岩"},{value:"350900",label:"宁德"}]},{value:"360000",label:"江西",children:[{value:"360100",label:"南昌"},{value:"360200",label:"景德镇"},{value:"360300",label:"萍乡"},{value:"360400",label:"九江"},{value:"360500",label:"新余"},{value:"360600",label:"鹰潭"},{value:"360700",label:"赣州"},{value:"360800",label:"吉安"},{value:"360900",label:"宜春"},{value:"361000",label:"抚州"},{value:"361100",label:"上饶"}]},{value:"370000",label:"山东",children:[{value:"370100",label:"济南"},{value:"370200",label:"青岛"},{value:"370300",label:"淄博"},{value:"370400",label:"枣庄"},{value:"370500",label:"东营"},{value:"370600",label:"烟台"},{value:"370700",label:"潍坊"},{value:"370800",label:"济宁"},{value:"370900",label:"泰安"},{value:"371000",label:"威海"},{value:"371100",label:"日照"},{value:"371200",label:"莱芜"},{value:"371300",label:"临沂"},{value:"371400",label:"德州"},{value:"371500",label:"聊城"},{value:"371600",label:"滨州"},{value:"371700",label:"菏泽"}]},{value:"410000",label:"河南",children:[{value:"410100",label:"郑州"},{value:"410200",label:"开封"},{value:"410300",label:"洛阳"},{value:"410400",label:"平顶山"},{value:"410500",label:"安阳"},{value:"410600",label:"鹤壁"},{value:"410700",label:"新乡"},{value:"410800",label:"焦作"},{value:"410881",label:"济源"},{value:"410900",label:"濮阳"},{value:"411000",label:"许昌"},{value:"411100",label:"漯河"},{value:"411200",label:"三门峡"},{value:"411300",label:"南阳"},{value:"411400",label:"商丘"},{value:"411500",label:"信阳"},{value:"411600",label:"周口"},{value:"411700",label:"驻马店"}]},{value:"420000",label:"湖北",children:[{value:"420100",label:"武汉"},{value:"420200",label:"黄石"},{value:"420300",label:"十堰"},{value:"420500",label:"宜昌"},{value:"420600",label:"襄阳"},{value:"420700",label:"鄂州"},{value:"420800",label:"荆门"},{value:"420900",label:"孝感"},{value:"421000",label:"荆州"},{value:"421100",label:"黄冈"},{value:"421200",label:"咸宁"},{value:"421300",label:"随州"},{value:"422800",label:"恩施土家族苗族自治州"},{value:"429004",label:"仙桃"},{value:"429005",label:"潜江"},{value:"429006",label:"天门"},{value:"429021",label:"神农架林区"}]},{value:"430000",label:"湖南",children:[{value:"430100",label:"长沙"},{value:"430200",label:"株洲"},{value:"430300",label:"湘潭"},{value:"430400",label:"衡阳"},{value:"430500",label:"邵阳"},{value:"430600",label:"岳阳"},{value:"430700",label:"常德"},{value:"430800",label:"张家界"},{value:"430900",label:"益阳"},{value:"431000",label:"郴州"},{value:"431100",label:"永州"},{value:"431200",label:"怀化"},{value:"431300",label:"娄底"},{value:"433100",label:"湘西土家族苗族自治州"}]},{value:"440000",label:"广东",children:[{value:"440100",label:"广州"},{value:"440200",label:"韶关"},{value:"440300",label:"深圳"},{value:"440400",label:"珠海"},{value:"440500",label:"汕头"},{value:"440600",label:"佛山"},{value:"440700",label:"江门"},{value:"440800",label:"湛江"},{value:"440900",label:"茂名"},{value:"441200",label:"肇庆"},{value:"441300",label:"惠州"},{value:"441400",label:"梅州"},{value:"441500",label:"汕尾"},{value:"441600",label:"河源"},{value:"441700",label:"阳江"},{value:"441800",label:"清远"},{value:"441900",label:"东莞"},{value:"442000",label:"中山"},{value:"445100",label:"潮州"},{value:"445200",label:"揭阳"},{value:"445300",label:"云浮"}]},{value:"450000",label:"广西",children:[{value:"450100",label:"南宁"},{value:"450200",label:"柳州"},{value:"450300",label:"桂林"},{value:"450400",label:"梧州"},{value:"450500",label:"北海"},{value:"450600",label:"防城港"},{value:"450700",label:"钦州"},{value:"450800",label:"贵港"},{value:"450900",label:"玉林"},{value:"451000",label:"百色"},{value:"451100",label:"贺州"},{value:"451200",label:"河池"},{value:"451300",label:"来宾"},{value:"451400",label:"崇左"}]},{value:"460000",label:"海南",children:[{value:"460100",label:"海口"},{value:"460200",label:"三亚"},{value:"469001",label:"五指山"},{value:"469002",label:"琼海"},{value:"469003",label:"儋州"},{value:"469005",label:"文昌"},{value:"469006",label:"万宁"},{value:"469007",label:"东方"},{value:"469025",label:"定安县"},{value:"469026",label:"屯昌县"},{value:"469027",label:"澄迈县"},{value:"469028",label:"临高县"},{value:"469030",label:"白沙黎族自治县"},{value:"469031",label:"昌江黎族自治县"},{value:"469033",label:"乐东黎族自治县"},{value:"469034",label:"陵水黎族自治县"},{value:"469035",label:"保亭黎族苗族自治县"},{value:"469036",label:"琼中黎族苗族自治县"},{value:"469037",label:"西沙群岛"},{value:"469038",label:"南沙群岛"},{value:"469039",label:"中沙群岛的岛礁及其海域"}]},{value:"500000",label:"重庆",children:[{value:"1",label:"重庆"}]},{value:"510000",label:"四川",children:[{value:"510100",label:"成都"},{value:"510300",label:"自贡"},{value:"510400",label:"攀枝花"},{value:"510500",label:"泸州"},{value:"510600",label:"德阳"},{value:"510700",label:"绵阳"},{value:"510800",label:"广元"},{value:"510900",label:"遂宁"},{value:"511000",label:"内江"},{value:"511100",label:"乐山"},{value:"511300",label:"南充"},{value:"511400",label:"眉山"},{value:"511500",label:"宜宾"},{value:"511600",label:"广安"},{value:"511700",label:"达州"},{value:"511800",label:"雅安"},{value:"511900",label:"巴中"},{value:"512000",label:"资阳"},{value:"513200",label:"阿坝藏族羌族自治州"},{value:"513300",label:"甘孜藏族自治州"},{value:"513400",label:"凉山彝族自治州"}]},{value:"520000",label:"贵州",children:[{value:"520100",label:"贵阳"},{value:"520200",label:"六盘水"},{value:"520300",label:"遵义"},{value:"520400",label:"安顺"},{value:"522200",label:"铜仁地区"},{value:"522300",label:"黔西南布依族苗族自治州"},{value:"522400",label:"毕节地区"},{value:"522600",label:"黔东南苗族侗族自治州"},{value:"522700",label:"黔南布依族苗族自治州"}]},{value:"530000",label:"云南",children:[{value:"530100",label:"昆明"},{value:"530300",label:"曲靖"},{value:"530400",label:"玉溪"},{value:"530500",label:"保山"},{value:"530600",label:"昭通"},{value:"530700",label:"丽江"},{value:"530800",label:"普洱"},{value:"530900",label:"临沧"},{value:"532300",label:"楚雄彝族自治州"},{value:"532500",label:"红河哈尼族彝族自治州"},{value:"532600",label:"文山壮族苗族自治州"},{value:"532800",label:"西双版纳傣族自治州"},{value:"532900",label:"大理白族自治州"},{value:"533100",label:"德宏傣族景颇族自治州"},{value:"533300",label:"怒江傈僳族自治州"},{value:"533400",label:"迪庆藏族自治州"}]},{value:"540000",label:"西藏",children:[{value:"540100",label:"拉萨"},{value:"542100",label:"昌都地区"},{value:"542200",label:"山南地区"},{value:"542300",label:"日喀则地区"},{value:"542400",label:"那曲地区"},{value:"542500",label:"阿里地区"},{value:"542600",label:"林芝地区"}]},{value:"610000",label:"陕西",children:[{value:"610100",label:"西安"},{value:"610200",label:"铜川"},{value:"610300",label:"宝鸡"},{value:"610400",label:"咸阳"},{value:"610500",label:"渭南"},{value:"610600",label:"延安"},{value:"610700",label:"汉中"},{value:"610800",label:"榆林"},{value:"610900",label:"安康"},{value:"611000",label:"商洛"}]},{value:"620000",label:"甘肃",children:[{value:"620100",label:"兰州"},{value:"620200",label:"嘉峪关"},{value:"620300",label:"金昌"},{value:"620400",label:"白银"},{value:"620500",label:"天水"},{value:"620600",label:"武威"},{value:"620700",label:"张掖"},{value:"620800",label:"平凉"},{value:"620900",label:"酒泉"},{value:"621000",label:"庆阳"},{value:"621100",label:"定西"},{value:"621200",label:"陇南"},{value:"622900",label:"临夏回族自治州"},{value:"623000",label:"甘南藏族自治州"}]},{value:"630000",label:"青海",children:[{value:"630100",label:"西宁"},{value:"632100",label:"海东地区"},{value:"632200",label:"海北藏族自治州"},{value:"632300",label:"黄南藏族自治州"},{value:"632500",label:"海南藏族自治州"},{value:"632600",label:"果洛藏族自治州"},{value:"632700",label:"玉树藏族自治州"},{value:"632800",label:"海西蒙古族藏族自治州"}]},{value:"640000",label:"宁夏",children:[{value:"640100",label:"银川"},{value:"640200",label:"石嘴山"},{value:"640300",label:"吴忠"},{value:"640400",label:"固原"},{value:"640500",label:"中卫"}]},{value:"650000",label:"新疆",children:[{value:"650100",label:"乌鲁木齐"},{value:"650200",label:"克拉玛依"},{value:"652100",label:"吐鲁番地区"},{value:"652200",label:"哈密地区"},{value:"652300",label:"昌吉回族自治州"},{value:"652700",label:"博尔塔拉蒙古自治州"},{value:"652800",label:"巴音郭楞蒙古自治州"},{value:"652900",label:"阿克苏地区"},{value:"653000",label:"克孜勒苏柯尔克孜自治州"},{value:"653100",label:"喀什地区"},{value:"653200",label:"和田地区"},{value:"654000",label:"伊犁哈萨克自治州"},{value:"654200",label:"塔城地区"},{value:"654300",label:"阿勒泰地区"},{value:"659001",label:"石河子"},{value:"659002",label:"阿拉尔"},{value:"659003",label:"图木舒克"},{value:"659004",label:"五家渠"}]},{value:"710000",label:"台湾",children:[{value:"710100",label:"台北"},{value:"710200",label:"高雄"},{value:"710300",label:"台南"},{value:"710400",label:"台中"},{value:"710500",label:"金门县"},{value:"710600",label:"南投县"},{value:"710700",label:"基隆"},{value:"710800",label:"新竹"},{value:"710900",label:"嘉义"},{value:"711100",label:"新北"},{value:"711200",label:"宜兰县"},{value:"711300",label:"新竹县"},{value:"711400",label:"桃园县"},{value:"711500",label:"苗栗县"},{value:"711700",label:"彰化县"},{value:"711900",label:"嘉义县"},{value:"712100",label:"云林县"},{value:"712400",label:"屏东县"},{value:"712500",label:"台东县"},{value:"712600",label:"花莲县"},{value:"712700",label:"澎湖县"}]},{value:"810000",label:"香港",children:[{value:"1",label:"香港"}]},{value:"820000",label:"澳门",children:[{value:"1",label:"澳门"}]},{value:"990000",label:"海外",children:[{value:"990100",label:"海外"}]}];function v(l){return l.map((function(l,e){return l.children&&0!=l.children.length&&(l.children=v(l.children)),l.value=l.label,l.extra=e,l}))}e.cityData=u;var b=v(u);e.cityData2=b},1501:function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.dataCpy=void 0;var u=[{label:"零售电商",value:"零售电商",extra:0,children:[{label:"壹玖壹玖",value:"壹玖壹玖",extra:0},{label:"康泽药业",value:"康泽药业",extra:1},{label:"家电网",value:"家电网",extra:2},{label:"酒便利",value:"酒便利",extra:3},{label:"猫诚股份",value:"猫诚股份",extra:4},{label:"乐汇电商",value:"乐汇电商",extra:5},{label:"喜宝动力",value:"喜宝动力",extra:6},{label:"昆汀科技",value:"昆汀科技",extra:7},{label:"他趣股份",value:"他趣股份",extra:8},{label:"优雅电商",value:"优雅电商",extra:9},{label:"全网数商",value:"全网数商",extra:10},{label:"红酒世界",value:"红酒世界",extra:11},{label:"悦为电商",value:"悦为电商",extra:12},{label:"春水堂",value:"春水堂",extra:13},{label:"唯车电商",value:"唯车电商",extra:14},{label:"茶人岭",value:"茶人岭",extra:15},{label:"奥斯马特",value:"奥斯马特",extra:16},{label:"桃花坞",value:"桃花坞",extra:17},{label:"速普电商",value:"速普电商",extra:18}]},{label:"产业电商",value:"产业电商",extra:1,children:[{label:"钢银电商",value:"钢银电商",extra:0},{label:"钢宝股份",value:"钢宝股份",extra:1},{label:"浩德钢圈",value:"浩德钢圈",extra:2},{label:"中钢网",value:"中钢网",extra:3},{label:"中钢电商",value:"中钢电商",extra:4},{label:"报春电商",value:"报春电商",extra:5},{label:"锦桥电商",value:"锦桥电商",extra:6},{label:"信立方",value:"信立方",extra:7},{label:"搜了网络",value:"搜了网络",extra:8},{label:"中塑在线",value:"中塑在线",extra:9},{label:"讯网网络",value:"讯网网络",extra:10},{label:"滨兴科技",value:"滨兴科技",extra:11}]},{label:"生活服务电商",value:"生活服务电商",extra:2,children:[{label:"神州优车",value:"神州优车",extra:0},{label:"骏途网",value:"骏途网",extra:1},{label:"差旅天下",value:"差旅天下",extra:2},{label:"虎凤蝶",value:"虎凤蝶",extra:3},{label:"留成网",value:"留成网",extra:4},{label:"淘车无忧",value:"淘车无忧",extra:5},{label:"小马科技",value:"小马科技",extra:6},{label:"爱车坊",value:"爱车坊",extra:7}]},{label:"跨境电商",value:"跨境电商",extra:3,children:[{label:"世贸通",value:"世贸通",extra:0},{label:"渝欧股份",value:"渝欧股份",extra:1},{label:"遨森电商",value:"遨森电商",extra:2},{label:"宝贝格子",value:"宝贝格子",extra:3},{label:"百事泰",value:"百事泰",extra:4},{label:"宝信环球",value:"宝信环球",extra:5},{label:"理德铭",value:"理德铭",extra:6},{label:"跨境翼",value:"跨境翼",extra:7},{label:"五五海淘",value:"五五海淘",extra:8},{label:"择尚科技",value:"择尚科技",extra:9},{label:"淘淘羊",value:"淘淘羊",extra:10},{label:"万方网络",value:"万方网络",extra:11}]}];e.dataCpy=u;var v={api:"/Home/Jzbxcx/new_data_json?dataid=6",name:"新三板电商财报数据库",nav:[{name:"xsbcpy",label:"领域/公司",icon:"list",value:"零售电商-壹玖壹玖",selector:["select","mutil-column-auto"]}]};e.sjkInfo=v},"17cb":function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.dataTime=e.dataField=void 0;var u=[{label:"全部",value:"全部",extra:0,children:[{label:"全部",value:"all",extra:0}]},{label:"零售电商",value:"零售电商",extra:1,children:[{label:"全部",value:"1",extra:0},{label:"跨境电商",value:"2",extra:1},{label:"品牌电商",value:"8",extra:2},{label:"社交电商",value:"10",extra:3},{label:"生鲜电商",value:"12",extra:4},{label:"二手电商",value:"13",extra:5},{label:"汽车电商",value:"14",extra:6}]},{label:"生活服务电商",value:"生活服务电商",extra:2,children:[{label:"全部",value:"3",extra:0},{label:"在线旅游",value:"9",extra:1},{label:"在线教育",value:"11",extra:2},{label:"在线餐饮",value:"16",extra:3},{label:"交通出行",value:"17",extra:4},{label:"在线票务",value:"18",extra:5},{label:"汽车电商",value:"14",extra:6}]}];e.dataField=u;var v=[{label:"全年",value:"whole_year",extra:0},{label:"1月",value:"1_month",extra:1},{label:"2月",value:"2_month",extra:2},{label:"3月",value:"3_month",extra:3},{label:"第一季度",value:"first_quarter",extra:4},{label:"4月",value:"4_month",extra:5},{label:"5月",value:"5_month",extra:6},{label:"6月",value:"6_month",extra:7},{label:"第二季度",value:"second_quarter",extra:8},{label:"上半年",value:"first_half",extra:9},{label:"618",value:"_618",extra:10},{label:"7月",value:"7_month",extra:11},{label:"8月",value:"8_month",extra:12},{label:"9月",value:"9_month",extra:13},{label:"第三季度",value:"third_quarter",extra:14},{label:"10月",value:"10_month",extra:15},{label:"双11",value:"single_day",extra:16},{label:"11月",value:"11_month",extra:17},{label:"12月",value:"12_month",extra:18},{label:"第四季度",value:"fourth_quarter",extra:19}];e.dataTime=v;var b={api:"/Home/Jzbxcx/json_315_post.html",name:"电商评级数据库",nav:[{name:"pjtype",label:"领域/行业",icon:"list",value:"",selector:["select","mutil-column-auto"]},{name:"year",label:"年份",icon:"calendar",value:"2020",selector:["select","single-column"]},{name:"time",label:"时间段",icon:"clock",value:"至今",selector:["select","single-column"]}]};e.sjkInfo=b},"2c86":function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.dataType=e.dataField=void 0;var u=[{label:"全部",value:"全部",extra:0},{label:"零售电商",value:"零售电商",extra:1},{label:"产业电商",value:"产业电商",extra:2},{label:"生活服务电商",value:"生活服务电商",extra:3},{label:"物流科技",value:"物流科技",extra:4},{label:"金融科技",value:"金融科技",extra:5}];e.dataField=u;var v=[{label:"独角兽",value:"独角兽",extra:0},{label:"千里马",value:"千里马",extra:1}];e.dataType=v;var b={api:"/Index/unicorn_json",name:"电商独角兽数据库",nav:[{name:"chen",label:"规模",icon:"list",value:"独角兽",selector:["select","single-column"]},{name:"cate",label:"分类",icon:"grid",value:"",selector:["select","single-column"]},{name:"time",label:"年份",icon:"calendar",value:(new Date).getFullYear()+"年",selector:["select","single-column"]}]};e.sjkInfo=b},"6b3d":function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.mainTar=void 0;var u=[{label:"中国",value:"中国",extra:0},{label:"美国",value:"美国",extra:1},{label:"日本",value:"日本",extra:2},{label:"德国",value:"德国",extra:3},{label:"韩国",value:"韩国",extra:4},{label:"英国",value:"英国",extra:5},{label:"法国",value:"法国",extra:6},{label:"加拿大",value:"加拿大",extra:7},{label:"西班牙",value:"西班牙",extra:8},{label:"澳大利亚",value:"澳大利亚",extra:9},{label:"印度",value:"印度",extra:10},{label:"泰国",value:"泰国",extra:11},{label:"意大利",value:"意大利",extra:12},{label:"丹麦",value:"丹麦",extra:13},{label:"瑞士",value:"瑞士",extra:14},{label:"荷兰",value:"荷兰",extra:15},{label:"俄罗斯",value:"俄罗斯",extra:16},{label:"墨西哥",value:"墨西哥",extra:17},{label:"比利时",value:"比利时",extra:18},{label:"瑞典",value:"瑞典",extra:19},{label:"巴西",value:"巴西",extra:20},{label:"土耳其",value:"土耳其",extra:21},{label:"爱尔兰",value:"爱尔兰",extra:22},{label:"奥地利",value:"奥地利",extra:23},{label:"乌克兰",value:"乌克兰",extra:24},{label:"南非",value:"南非",extra:25},{label:"新加坡",value:"新加坡",extra:26},{label:"卢森堡",value:"卢森堡",extra:27}];e.mainTar=u;var v={api:"/Home/Jzbxcx/new_data_json?dataid=5",name:"全球电商数据库",nav:[{name:"cate",label:"国家",icon:"map",value:"",selector:["select","single-column"]}]};e.sjkInfo=v},7246:function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.dataRound=e.dataField=void 0;var u=[{label:"全部",value:"全部",extra:0,children:[{label:"全部",value:"全部",extra:0}]},{label:"零售电商",value:"零售电商",extra:1,children:[{label:"全部",value:"全部",extra:0},{label:"综合电商",value:"综合电商",extra:1},{label:"社交电商",value:"社交电商",extra:2},{label:"社区电商",value:"社区电商",extra:3},{label:"农村电商",value:"农村电商",extra:4},{label:"医药电商",value:"医药电商",extra:5},{label:"生鲜电商",value:"生鲜电商",extra:6},{label:"无人零售",value:"无人零售",extra:7},{label:"奢侈品电商",value:"奢侈品电商",extra:8},{label:"汽车电商",value:"汽车电商",extra:9},{label:"母婴电商",value:"母婴电商",extra:10},{label:"二手电商",value:"二手电商",extra:11},{label:"导购电商",value:"导购电商",extra:12},{label:"食品电商",value:"食品电商",extra:13},{label:"宠物电商",value:"宠物电商",extra:14},{label:"众筹电商",value:"众筹电商",extra:15},{label:"分期电商",value:"分期电商",extra:16},{label:"服装电商",value:"服装电商",extra:17},{label:"电商服务商",value:"电商服务商",extra:18},{label:"美妆电商",value:"美妆电商",extra:19},{label:"酒水电商",value:"酒水电商",extra:20},{label:"直播电商",value:"直播电商",extra:21}]},{label:"产业电商",value:"产业电商",extra:2,children:[{label:"全部",value:"全部",extra:0},{label:"综合B2B",value:"综合B2B",extra:1},{label:"钢铁电商",value:"钢铁电商",extra:2},{label:"塑化电商",value:"塑化电商",extra:3},{label:"农业B2B",value:"农业B2B",extra:4},{label:"汽车B2B",value:"汽车B2B",extra:5},{label:"纺服B2B",value:"纺服B2B",extra:6},{label:"能源电商",value:"能源电商",extra:7},{label:"建材电商",value:"建材电商",extra:8},{label:"印包电商",value:"印包电商",extra:9},{label:"医疗电商",value:"医疗电商",extra:10},{label:"餐饮B2B",value:"餐饮B2B",extra:11},{label:"快消品B2B",value:"消品B2B",extra:12},{label:"工业品电商",value:"工业品电商",extra:13},{label:"元器件电商",value:"元器件电商",extra:14},{label:"B2B服务商",value:"B2B服务商",extra:15},{label:"其他电商",value:"其他电商",extra:16}]},{label:"跨境电商",value:"跨境电商",extra:3,children:[{label:"全部",value:"全部",extra:0},{label:"进口电商",value:"进口电商",extra:1},{label:"出口电商",value:"出口电商",extra:2},{label:"跨境服务商",value:"跨境服务商",extra:3}]},{label:"生活服务电商",value:"生活服务电商",extra:4,children:[{label:"全部",value:"全部",extra:0},{label:"在线教育",value:"在线教育",extra:1},{label:"在线住宿",value:"在线住宿",extra:2},{label:"在线医疗",value:"在线医疗",extra:3},{label:"在线旅游",value:"在线旅游",extra:4},{label:"社区服务",value:"社区服务",extra:5},{label:"在线票务",value:"在线票务",extra:6},{label:"交通出行",value:"交通出行",extra:7},{label:"餐饮外卖",value:"餐饮外卖",extra:8},{label:"家政服务",value:"家政服务",extra:9},{label:"美业服务",value:"美业服务",extra:10},{label:"共享经济",value:"共享经济",extra:11},{label:"运动健身",value:"运动健身",extra:12},{label:"互联网家装",value:"互联网家装",extra:13},{label:"其他",value:"其他",extra:14}]},{label:"物流科技",value:"物流科技",extra:5,children:[{label:"全部",value:"全部",extra:0},{label:"物流网络",value:"物流网络",extra:1},{label:"电商自建物流",value:"电商自建物流",extra:2},{label:"第三方快递",value:"第三方快递",extra:3},{label:"智能快递柜",value:"智能快递柜",extra:4},{label:"众包物流",value:"众包物流",extra:5},{label:"仓储物流",value:"仓储物流",extra:6},{label:"货运O2O",value:"货运O2O",extra:7},{label:"同城配送",value:"同城配送",extra:8},{label:"跨境物流",value:"跨境物流",extra:9},{label:"智能物流",value:"智能物流",extra:10}]}];e.dataField=u;var v=[{label:"全部",value:"全部",extra:0},{label:"未透露",value:"未透露",extra:1},{label:"天使轮",value:"天使",extra:2},{label:"种子轮",value:"种子",extra:3},{label:"Pre级",value:"Pre",extra:4},{label:"A级",value:"A",extra:5},{label:"B级",value:"B",extra:6},{label:"C级",value:"C",extra:7},{label:"D级",value:"D",extra:8},{label:"E级",value:"E",extra:9},{label:"F级",value:"F",extra:10},{label:"H级",value:"H",extra:11},{label:"IPO上市",value:"IPO",extra:12},{label:"战略投资",value:"战略投资",extra:13},{label:"并购",value:"并购",extra:14}];e.dataRound=v;var b={api:"/Index/investment_json",name:"电商投融资数据库",nav:[{name:"cate",label:"分类",icon:"grid",value:"",selector:["select","mutil-column-auto"]},{name:"round",label:"轮次",icon:"info-circle",value:"",selector:["select","single-column"]},{name:"area",label:"地区",icon:"map",value:"",selector:["select","mutil-column-auto"]},{name:"time",label:"时间",icon:"clock",value:"",selector:["picker","time"]}]};e.sjkInfo=b},"7bc0":function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=m(a("7246")),v=m(a("2c86")),b=m(a("d38c")),t=m(a("bfd4")),r=m(a("883c")),x=m(a("6b3d")),n=m(a("df52")),c=m(a("8a1a")),i=m(a("17cb")),o=m(a("d89c")),d=m(a("1501"));function s(){if("function"!==typeof WeakMap)return null;var l=new WeakMap;return s=function(){return l},l}function m(l){if(l&&l.__esModule)return l;if(null===l||"object"!==typeof l&&"function"!==typeof l)return{default:l};var e=s();if(e&&e.has(l))return e.get(l);var a={},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in l)if(Object.prototype.hasOwnProperty.call(l,v)){var b=u?Object.getOwnPropertyDescriptor(l,v):null;b&&(b.get||b.set)?Object.defineProperty(a,v,b):a[v]=l[v]}return a.default=l,e&&e.set(l,a),a}var h={trz:u,djs:v,bq:b,sw:t,cyy:r,qq:x,hy:n,zsq:c,pj:i,cb:o,xsb:d},f=h;e.default=f},"883c":function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=void 0;var u={api:"/Home/Jzbxcx/new_data_json?dataid=7",name:"中国电商产业园数据库",nav:[{name:"cyyArea",label:"地区",icon:"map",value:"",selector:["select","mutil-column-auto"]}]};e.sjkInfo=u},"8a1a":function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.mainTar=void 0;var u=[{label:"北京",value:"北京",extra:0},{label:"上海",value:"上海",extra:1},{label:"广州",value:"广州",extra:2},{label:"深圳",value:"深圳",extra:3},{label:"杭州",value:"杭州",extra:4},{label:"成都",value:"成都",extra:5},{label:"宁波",value:"宁波",extra:6},{label:"合肥",value:"合肥",extra:7},{label:"大连",value:"大连",extra:8},{label:"重庆",value:"重庆",extra:9},{label:"青岛",value:"青岛",extra:10},{label:"天津",value:"天津",extra:11},{label:"南京",value:"南京",extra:12},{label:"南昌",value:"南昌",extra:13},{label:"武汉",value:"武汉",extra:14},{label:"昆明",value:"昆明",extra:15},{label:"西安",value:"西安",extra:16},{label:"兰州",value:"兰州",extra:17},{label:"厦门",value:"厦门",extra:18},{label:"唐山",value:"唐山",extra:19},{label:"无锡",value:"无锡",extra:20},{label:"威海",value:"威海",extra:21},{label:"东莞",value:"东莞",extra:22},{label:"义乌",value:"义乌",extra:23}];e.mainTar=u;var v={api:"/Home/Jzbxcx/new_data_json?dataid=10",name:"跨境电商综试区数据库",nav:[{name:"name",label:"城市",icon:"map",value:"",selector:["select","single-column"]}]};e.sjkInfo=v},bfd4:function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.time=e.dataField=void 0;var u=[{label:"零售电商",value:"零售电商",extra:0},{label:"产业电商",value:"产业电商",extra:1},{label:"跨境电商",value:"跨境电商",extra:2},{label:"生活服务电商",value:"生活服务电商",extra:3},{label:"物流科技",value:"物流科技",extra:4}];e.dataField=u;var v=[{label:"2020年",value:2020,extra:0},{label:"2019年",value:2019,extra:1},{label:"2018年",value:2018,extra:2}];e.time=v;var b={api:"/Home/Jzbxcx/new_data_json?dataid=9",name:"“死亡”电商数据库",nav:[{name:"shares",label:"分类",icon:"grid",value:"零售电商",selector:["select","single-column"]},{name:"area",label:"地区",icon:"map",value:"",selector:["select","mutil-column-auto"]},{name:"dtime",label:"关停年份",icon:"clock",value:"",selector:["select","single-column"]}]};e.sjkInfo=b},d38c:function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.hotCities=e.dataType=e.dataField=void 0;var u=[{label:"零售电商",value:"零售电商",extra:0},{label:"产业电商",value:"产业电商",extra:1},{label:"生活服务电商",value:"生活服务电商",extra:2},{label:"物流科技",value:"物流科技",extra:3},{label:"金融科技",value:"金融科技",extra:4}];e.dataField=u;var v=[{label:"全部",value:"全部",extra:0},{label:"上市",value:"上市",extra:1},{label:"独角兽",value:"独角兽",extra:2},{label:"千里马",value:"千里马",extra:3}];e.dataType=v;var b=[{label:"全部",value:"全部",extra:0},{label:"北京",value:"北京",extra:1},{label:"上海",value:"上海",extra:2},{label:"杭州",value:"杭州",extra:3},{label:"深圳",value:"深圳",extra:4},{label:"广州",value:"广州",extra:5}];e.hotCities=b;var t={api:"/Home/Jzbxcx/new_data_json?dataid=11",name:"“百强”电商数据库",nav:[{name:"a104",label:"规模",icon:"list",value:"",selector:["select","single-column"]},{name:"a101",label:"分类",icon:"grid",value:"零售电商",selector:["select","single-column"]},{name:"a103",label:"热门城市",icon:"map",value:"",selector:["select","single-column"]}]};e.sjkInfo=t},d89c:function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.dataCpy=void 0;var u=[{label:"零售电商",value:"零售电商",extra:0,children:[{label:"阿里巴巴",value:"阿里巴巴",extra:0},{label:"京东",value:"京东",extra:1},{label:"拼多多",value:"拼多多",extra:2},{label:"唯品会",value:"唯品会",extra:3},{label:"苏宁易购",value:"苏宁易购",extra:4},{label:"国美零售",value:"国美零售",extra:5},{label:"寺库",value:"寺库",extra:6},{label:"小米",value:"小米",extra:7},{label:"小熊电器",value:"小熊电器",extra:8},{label:"1药网",value:"1药网",extra:9},{label:"有赞",value:"有赞",extra:10},{label:"微盟集团",value:"微盟集团",extra:11},{label:"蘑菇街",value:"蘑菇街",extra:12},{label:"蘑菇街",value:"蘑菇街",extra:13},{label:"如涵",value:"如涵",extra:14},{label:"云集",value:"云集",extra:15},{label:"什么值得买",value:"什么值得买",extra:16},{label:"宝宝树",value:"宝宝树",extra:17},{label:"优信",value:"优信",extra:18},{label:"团车网",value:"团车网",extra:19},{label:"三只松鼠",value:"三只松鼠",extra:20},{label:"御家汇",value:"御家汇",extra:21},{label:"南极电商",value:"南极电商",extra:22},{label:"歌力思",value:"歌力思",extra:23},{label:"乐信",value:"乐信",extra:24},{label:"趣店",value:"趣店",extra:25},{label:"宝尊电商",value:"宝尊电商",extra:26},{label:"良品铺子",value:"良品铺子",extra:27},{label:"壹网壹创",value:"壹网壹创",extra:28},{label:"酷特智能",value:"酷特智能",extra:29},{label:"达达集团",value:"达达集团",extra:30},{label:"波奇宠物",value:"波奇宠物",extra:31},{label:"优趣汇",value:"优趣汇",extra:32},{label:"蚂蚁集团",value:"蚂蚁集团",extra:33},{label:"快手",value:"快手",extra:34},{label:"乐活",value:"乐活",extra:35},{label:"物农网",value:"物农网",extra:36}]},{label:"产业电商",value:"产业电商",extra:1,children:[{label:"生意宝",value:"生意宝",extra:0},{label:"焦点科技",value:"焦点科技",extra:1},{label:"上海钢联",value:"上海钢联",extra:2},{label:"欧浦智网",value:"欧浦智网",extra:3},{label:"冠福股份",value:"冠福股份",extra:4},{label:"科通芯城",value:"科通芯城",extra:5},{label:"慧聪集团",value:"慧聪集团",extra:6},{label:"卓尔智联",value:"卓尔智联",extra:7},{label:"国联股份",value:"国联股份",extra:8},{label:"摩贝",value:"摩贝",extra:9}]},{label:"生活服务电商",value:"生活服务电商",extra:2,children:[{label:"携程",value:"携程",extra:0},{label:"同程艺龙",value:"同程艺龙",extra:1},{label:"途牛",value:"途牛",extra:2},{label:"美团点评",value:"美团点评",extra:3},{label:"齐屹科技",value:"齐屹科技",extra:4},{label:"前程无忧",value:"前程无忧",extra:5},{label:"新东方在线",value:"新东方在线",extra:6},{label:"无忧英语",value:"无忧英语",extra:7},{label:"跟谁学",value:"跟谁学",extra:8},{label:"网易有道",value:"网易有道",extra:9},{label:"乐居",value:"乐居",extra:10},{label:"搜房网",value:"搜房网",extra:11},{label:"房多多",value:"房多多",extra:12},{label:"青客公寓",value:"青客公寓",extra:13},{label:"平安好医生",value:"平安好医生",extra:14},{label:"新氧",value:"新氧",extra:15},{label:"阿里健康",value:"阿里健康",extra:16},{label:"阿里影业",value:"阿里影业",extra:17},{label:"猫眼娱乐",value:"猫眼娱乐",extra:18},{label:"瑞幸咖啡",value:"瑞幸咖啡",extra:19},{label:"蛋壳公寓",value:"蛋壳公寓",extra:20},{label:"趣活",value:"趣活",extra:21},{label:"京东健康",value:"京东健康",extra:22},{label:"尚德机构",value:"尚德机构",extra:23}]},{label:"跨境电商",value:"跨境电商",extra:3,children:[{label:"跨境通",value:"跨境通",extra:0},{label:"广博股份",value:"广博股份",extra:1},{label:"兰亭集势",value:"兰亭集势",extra:2},{label:"天泽信息",value:"天泽信息",extra:3},{label:"联络互动",value:"联络互动",extra:4},{label:"华鼎股份",value:"华鼎股份",extra:5},{label:"新维国际",value:"新维国际",extra:6},{label:"安克创新",value:"安克创新",extra:7},{label:"eBay",value:"eBay",extra:8},{label:"亚马逊",value:"亚马逊",extra:9},{label:"Wish",value:"Wish",extra:10}]}];e.dataCpy=u;var v={api:"/Home/Jzbxcx/new_data_json?dataid=2",name:"电商上市公司财报数据库",nav:[{name:"cbcpy",label:"领域/公司",icon:"list",value:"零售电商-阿里巴巴",selector:["select","mutil-column-auto"]}]};e.sjkInfo=v},df52:function(l,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sjkInfo=e.dataField=void 0;var u=[{label:"电商整体",value:"电商整体",extra:0,children:[{label:"电子商务",value:"电子商务",extra:0},{label:"移动电商",value:"移动电商",extra:1},{label:"电商人员",value:"电商人员",extra:2},{label:"电商服务业",value:"电商服务业",extra:3},{label:"品牌电商服务",value:"品牌电商服务",extra:4},{label:"网络经济",value:"网络经济",extra:5},{label:"产业互联网",value:"产业互联网",extra:6}]},{label:"产业电商",value:"产业电商",extra:1,children:[{label:"产业电商",value:"产业电商",extra:0},{label:"大宗电商",value:"大宗电商",extra:1},{label:"快消品B2B",value:"快消品B2B",extra:2},{label:"钢铁电商",value:"钢铁电商",extra:3},{label:"医药B2B",value:"医药B2B",extra:4},{label:"企业采购",value:"企业采购",extra:5},{label:"工业品电商",value:"工业品电商",extra:6},{label:"纺服B2B",value:"纺服B2B",extra:7}]},{label:"零售电商",value:"零售电商",extra:2,children:[{label:"网络零售",value:"网络零售",extra:0},{label:"社交电商",value:"社交电商",extra:1},{label:"农村电商",value:"农村电商",extra:2},{label:"生鲜电商",value:"生鲜电商",extra:3},{label:"母婴电商",value:"母婴电商",extra:4},{label:"奢侈品电商",value:"奢侈品电商",extra:5},{label:"微商",value:"微商",extra:6},{label:"二手电商",value:"二手电商",extra:7},{label:"二手车电商",value:"二手车电商",extra:8},{label:"社区团购",value:"社区团购",extra:9},{label:"家电电商",value:"家电电商",extra:10},{label:"食品电商",value:"食品电商",extra:11},{label:"医药电商",value:"医药电商",extra:12},{label:"海外代购",value:"海外代购",extra:13},{label:"美妆电商",value:"美妆电商",extra:14},{label:"导购电商",value:"导购电商",extra:15},{label:"个护美妆",value:"个护美妆",extra:16},{label:"天猫双11",value:"天猫双11",extra:17},{label:"全网双11",value:"全网双11",extra:18},{label:"京东双11",value:"京东双11",extra:19},{label:"代运营",value:"代运营",extra:20},{label:"家居建材",value:"家居建材",extra:21},{label:"B2C电商",value:"B2C电商",extra:22},{label:"服装电商",value:"服装电商",extra:23},{label:"直播电商",value:"直播电商",extra:24},{label:"京东618",value:"京东618",extra:25},{label:"淘宝直播",value:"淘宝直播",extra:26},{label:"快手直播",value:"快手直播",extra:27},{label:"抖音直播",value:"抖音直播",extra:28}]},{label:"生活服务电商",value:"生活服务电商",extra:3,children:[{label:"生活服务电商",value:"生活服务电商",extra:0},{label:"在线外卖",value:"在线外卖",extra:1},{label:"在线旅游",value:"在线旅游",extra:2},{label:"在线教育",value:"在线教育",extra:3},{label:"互联网医疗",value:"互联网医疗",extra:4},{label:"互联网家装",value:"互联网家装",extra:5},{label:"互联网餐饮",value:"互联网餐饮",extra:6},{label:"医美电商",value:"医美电商",extra:7},{label:"同城O2O",value:"同城O2O",extra:8},{label:"社区O2O",value:"社区O2O",extra:9},{label:"互联网婚恋",value:"互联网婚恋",extra:10}]},{label:"跨境电商",value:"跨境电商",extra:4,children:[{label:"跨境电商",value:"跨境电商",extra:0},{label:"出口跨境电商",value:"出口跨境电商",extra:1},{label:"进口跨境电商",value:"进口跨境电商",extra:2},{label:"跨境支付",value:"跨境支付",extra:3},{label:"跨境物流",value:"跨境物流",extra:4}]},{label:"共享经济",value:"共享经济",extra:5,children:[{label:"共享经济",value:"共享经济",extra:0},{label:"共享单车",value:"共享单车",extra:1},{label:"共享住宿",value:"共享住宿",extra:2},{label:"网约车",value:"网约车",extra:3},{label:"共享办公",value:"共享办公",extra:4},{label:"共享充电宝",value:"共享充电宝",extra:5},{label:"共享汽车",value:"共享汽车",extra:6}]},{label:"物流科技",value:"物流科技",extra:6,children:[{label:"快递",value:"快递",extra:0},{label:"全球电商物流",value:"全球电商物流",extra:1},{label:"即时物流",value:"即时物流",extra:2},{label:"智慧物流",value:"智慧物流",extra:3},{label:"冷链物流",value:"冷链物流",extra:4},{label:"社会物流",value:"社会物流",extra:5},{label:"同城货运",value:"同城货运",extra:6},{label:"智能快递柜",value:"智能快递柜",extra:7}]}];e.dataField=u;var v={api:"/Home/Jzbxcx/new_data_json?dataid=1",name:"电商行业数据库",nav:[{name:"hycate",label:"领域",icon:"list",value:"",selector:["select","mutil-column-auto"]}]};e.sjkInfo=v}}]);