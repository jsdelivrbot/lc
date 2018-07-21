import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import * as echarts from 'echarts';

/**
 * Generated class for the SalesPerformanceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-performance-detail',
  templateUrl: 'sales-performance-detail.html',
})
export class SalesPerformanceDetailPage {
  public config: any;
  public storeName: string = "业务组";
  public storeId: number = 1;
  // 业绩类型
  public tag: number = 1;
  // 季度
  public dateType: number = 1;
  public nowAmount: number = 0;
  public lastMonthAmount: number = 0;
  public lastYearAmount: number = 0;
  public rose: number = 0;
  public yoyg: number = 0;
  // 图表
  public date = [];
  public numdata = [];
  public listChart = [];
  public listChartReverse = [];
  // 表格
  public listMap: Array<any> = [];
  public totalAmount: number = 0;
  // 显示文字数据
  public textArr: Array<any> = [
    ['销售总额', '销售额'],
    ['常规销售额', '销售额'],
    ['寄存销售额', '销售额'],
    ['顾客录入数', '顾客数'],
    ['新顾客数', '顾客数'],
    ['消费顾客数', '顾客数']
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
  ) {
    // 初始化echart数据
    this.config = {
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      legend: {
        data: [],
        right: 1,
        top: 1
      },
      grid: {
        left: 50,
        top: 45,
        right: 30,
        bottom: 20,
      },
      toolbox: {
        show: false,
      },
      xAxis: {
        nameGap: 3,
        nameTextStyle: {
          color: '#999999',
        },
        type: 'category',
        boundaryGap: false,
        data: [1, 2, 3],
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#eeeeee',
            fontSize: 14
          }
        },
        axisLabel: {
          margin: 8,
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
        }
      },
      yAxis: {
        nameGap: 4,
        nameTextStyle: {
          color: '#777777',
          fontSize: '18',
        },
        type: 'value',
        splitLine: {
          lineStyle: {
            color: ['#eeeeee']
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#eeeeee',
            fontSize: 20
          }
        },
        axisLabel: {
          margin: 8,
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
        }
      },

      series: [{
        data: [1, 2, 3],
        type: 'line',
        areaStyle: {
          normal: {
            fontSize: 14,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: 'rgba(255,240,245,1)'
            },
            {
              offset: 0.5,
              color: 'rgba(233,193,194,1)'
            },
            {
              offset: 1,
              color: 'rgba(233,193,194,1)'
            }], false)
          }
        },
        itemStyle: {
          show: true,
          normal: {
            color: 'rgba(233,193,194,1)'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'outside',
            textStyle: {
              color: '#999999',
              fontSize: 12,
            }
          }
        },
        lineStyle: {
          normal: {
            width: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0.5, 0, [{
              offset: 0,
              color: 'rgba(228,142,127,1)'
            }, {
              offset: 1,
              color: 'rgba(228,142,127,1)'
            }], false)
          }
        },
      }]
    };
  }

  // 改变季度
  changeType(dateType) {
    this.dateType = dateType;
    this.date = [];
    this.numdata = [];
    this.getData();
  }

  ionViewDidLoad() {
    this.tag = this.navParams.data.type;
    // 获取业务组名称
    this.storeName = this.navParams.data.storeName;
    this.storeId = this.navParams.data.storeId;
    // 获取数据
    this.getData();
  }

  // 获取数据
  getData() {
    this.appService.httpPost("findSecoundSalesAnalysis.api", {
      storeId: this.storeId,
      tag: this.tag,
      dateType: this.dateType
    }, (res) => {
      if (res.code == 1) {
        // 顶部三个数字
        this.nowAmount = res.data.nowAmount;
        this.lastMonthAmount = res.data.lastMonthAmount;
        this.lastYearAmount = res.data.lastYearAmount;
        // 计算环比同比
        this.rose = this.lastMonthAmount == 0 || this.lastMonthAmount == null ? 0 : ((this.nowAmount - this.lastMonthAmount) / this.lastMonthAmount) * 100;
        this.yoyg = this.lastYearAmount == 0 || this.lastYearAmount == null ? 0 : ((this.nowAmount - this.lastYearAmount) / this.lastYearAmount) * 100;
        // 获取业务组排名情况，计算合计
        if (res.data.listMap) {
          this.listMap = res.data.listMap;
          this.totalAmount = 0;
          for (let i = 0; i < this.listMap.length; i++) {
            this.totalAmount += this.listMap[i].amount;
          }
        }

        this.listChart = res.data.listChart || [];
        for (let i = this.listChart.length; i > 0; i--) {
          this.listChartReverse.push(this.listChart[i - 1]);
        }
        // // 计算图表数据
        this.date = [];
        this.numdata = [];
        for (let i = 0; i < this.listChart.length; i++) {
          this.date.push(
            this.listChart[i]['dateStr'].split("-").pop(),
          );
          this.numdata.push(this.listChart[i]['consumeSum']);
        }

        this.config = {
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          legend: {
            data: [],
            right: 1,
            top: 1
          },
          grid: {
            left: 50,
            top: 45,
            right: 30,
            bottom: 20,
          },
          toolbox: {
            show: false,
          },
          xAxis: {
            nameGap: 3,
            nameTextStyle: {
              color: '#999999',
            },
            type: 'category',
            boundaryGap: false,
            data: this.date,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#eeeeee',
                fontSize: 14
              }
            },
            axisLabel: {
              margin: 8,
              textStyle: {
                color: '#999999',
                fontSize: 12
              }
            }
          },
          yAxis: {
            name: '',
            nameGap: 4,
            nameTextStyle: {
              color: '#777777',
              fontSize: '18',
            },
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['#eeeeee']
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#eeeeee',
                fontSize: 20
              }
            },
            axisLabel: {
              margin: 8,
              textStyle: {
                color: '#999999',
                fontSize: 12
              }
            }
          },
          series: [{
            data: this.numdata,
            type: 'line',
            areaStyle: {
              normal: {
                fontSize: 14,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(255,240,245,1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(233,193,194,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(233,193,194,1)'
                }], false)
              }
            },
            itemStyle: {
              show: true,
              normal: {
                color: 'rgba(233,193,194,1)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside',
                textStyle: {
                  color: '#999999',
                  fontSize: 12,
                }
              }

            },
            lineStyle: {
              normal: {
                width: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 0.5, 0, [{
                  offset: 0,
                  color: 'rgba(228,142,127,1)'
                }, {
                  offset: 1,
                  color: 'rgba(228,142,127,1)'
                }], false)
              }
            },
          }]
        };
      }
    }, true);
  }
}
