// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  '/api/todos': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [
          {
            id: 1,
            text: 'Learn antd',
            isComplete: true,
          },
          {
            id: 2,
            text: 'Learn ant-tool',
          },
          {
            id: 3,
            text: 'Learn dora',
          },
        ],
      });
    }, 500);
  },
  '/auth': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        "email": "justin@beansmile.com",
        "password": "12345678",
        "access_token":"db34ieng-fehgeing"
      });
    }, 500);
  },
  '/menu': function(req,res){
    setTimeout(function(){
      res.json({
        success:true,
        menulist:[{
                id: '001',
                code: 'classManage',
                title: '班包班次管理',
                subMenus: [{
                   id:'0101',
                   code:'classFlight',
                   title:'班次管理',
                   url:'classManage/classFlight'
                },{
                    id: '0102',
                    code: 'classPackageManager',
                    title: '班包管理',
                    url:'classManage/classPackageManager'                    
                },{
                    id: '0103',
                    code: 'classPackageGroup',
                    title: '班包员工绑定',
                    url:'classManage/classPackageGroup'
                },{
                    id: '0104',
                    code: 'list',
                    title: '员工班包绑定',
                    url:'classManage/classUserInfoGroup'
                }
                ]
            },{
                id: '02',
                code: 'error',
                title: '考勤异常处理',
                subMenus: [{
                    id: '0201',
                    code: 'leaveInfo',
                    title: '请假信息处理',
                    url:'error/leaveInfo'
                },{
                    id: '0202',
                    code: 'businessInfo',
                    title: '公出信息处理',
                    url:'error/businessInfo'
                },{
                    id: '0203',
                    code: 'autoInputAbnormal',
                    title: '手动添加异常',
                    url:'error/autoInputAbnormal'
                },{
                    id: '0204',
                    code: 'overtimeInfo',
                    title: '加班信息处理',
                    url:'error/overtimeInfo'
                },{
                    id: '0205',
                    code: 'abnormalHandle',
                    title: '异常考勤处理',
                    url:'error/abnormalHandle'
                }
                ]
            },{
                id: '03',
                code: 'reportManage',
                title: '报表管理',
                subMenus: [{
                    id: '0301',
                    code: 'originalInfo',
                    title: '考勤原始数据',
                    url:'reportManage/originalInfo'
                },{
                    id: '0302',
                    code: 'resultInfo',
                    title: '考勤结果数据',
                    url:'reportManage/resultInfo'
                },{
                    id: '0303',
                    code: 'gatherreport',
                    title: '考勤月度汇总报表',
                    url:'reportManage/gatherreport'
                },{
                    id: '0304',
                    code: 'monthreport',
                    title: '考勤月报表',
                    url:'reportManage/monthreport'
                },{
                    id: '0305',
                    code: 'dayreport',
                    title: '考勤部门日报表',
                    url:'reportManage/dayreport'
                },{
                    id: '0305',
                    code: 'absencereport',
                    title: '考勤缺勤明细报表',
                    url:'reportManage/absencereport'
                },{
                    id: '0305',
                    code: 'exceptionreport',
                    title: '考勤异常明细表',
                    url:'reportManage/exceptionreport'
                },{
                    id: '0305',
                    code: 'attenresultreport',
                    title: '考勤结果详情表',
                    url:'reportManage/attenresultreport'
                },{
                    id: '0305',
                    code: 'timebank',
                    title: '综合工时报表',
                    url:'reportManage/timebank'
                },{
                    id: '0305',
                    code: 'timebank',
                    title: '时间银行报表',
                    url:'reportManage/timebank'
                }
                ]
            },{
                id: '04',
                code: 'sysManage',
                title: '报表管理',
                subMenus: [{
                    id: '0401',
                    code: 'resultCommit',
                    title: '考勤结果提交',
                    url:'sysManage/resultCommit'
                },{
                    id: '0402',
                    code: 'festival',
                    title: '节假日管理',
                    url:'sysManage/festival'
                },{
                    id: '0403',
                    code: 'department',
                    title: '组织机构管理',
                    url:'sysManage/department'
                },{
                    id: '0404',
                    code: 'userInfo',
                    title: '员工信息管理',
                    url:'sysManage/userInfo'
                },{
                    id: '0405',
                    code: 'logInfo',
                    title: '考勤日志管理',
                    url:'sysManage/logInfo'
                },{
                    id: '0405',
                    code: 'configure',
                    title: '考勤配置管理',
                    url:'sysManage/configure'
                },{
                    id: '0405',
                    code: 'baseday',
                    title: '基准日设置',
                    url:'sysManage/baseday'
                },{
                    id: '0405',
                    code: 'coordinates',
                    title: '移动打卡设置',
                    url:'sysManage/coordinates'
                },{
                    id: '0405',
                    code: 'timebank',
                    title: '时间银行参数设置',
                    url:'sysManage/timebank'
                }
                ]
            },{
                id: '05',
                code: 'accessManage',
                title: '权限管理',
                subMenus: [{
                    id: '0501',
                    code: 'menuManage',
                    title: '菜单管理',
                    url:'accessManage/menuManage'
                },{
                    id: '0502',
                    code: 'attendanceUserInfo',
                    title: '考勤员管理',
                    url:'accessManage/attendanceUserInfo'
                },{
                    id: '0503',
                    code: 'buttonManage',
                    title: '按钮管理',
                    url:'accessManage/buttonManage'
                },{
                    id: '0504',
                    code: 'roleManage',
                    title: '角色管理',
                    url:'accessManage/roleManage'
                }
                ]
            },{
                id: '06',
                code: 'feedback',
                title: '投诉反馈',
                url:'feedback'
            }

            ]
      })
    })
  },
};
