import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';
import { AppMainComponent } from '../../app.main.component';
import {AppConfig} from '../domain/appconfig';
import {ConfigService} from '../service/app.config.service';
import {Subscription} from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class DashboardDemoComponent implements OnInit {

    ordersChart: any;

    ordersOptions: any;

    activeOrders = 0;

    trafficChart: any;

    trafficOptions: any;

    activeTraffic = 0;

    goalChart: any;

    goalOptions: any;

    items: MenuItem[];

    val1 = 1;

    val2 = 2;

    orderWeek: any;

    selectedOrderWeek: any;

    products: Product[];

    productsThisWeek: Product[];

    productsLastWeek: Product[];

    config: AppConfig;

    subscription: Subscription;

    constructor(private productService: ProductService, private breadcrumbService: AppBreadcrumbService, private appMain: AppMainComponent, public configService: ConfigService) {
        this.breadcrumbService.setItems([
            { label: 'Favorites' },
            { label: 'Dashboard' }
        ]);

        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
    }

    ngOnInit() {
        var options = {
            method: 'GET'
          };

          
          fetch("http://localhost:3000/teams/newest", options)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.showPlayer(result);
            })
            .catch(error => console.log('error', error));

            var options2 = {
                method: 'GET'
            };
    
              
              fetch("https://ballermetrics-backend2.onrender.com/teams/getPlayers/Pistons", options2)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    this.showPlayers(result);
                })
                .catch(error => console.log('error', error));

                const options3: RequestInit = {
                    method: 'GET',
                    redirect: 'follow' as RequestRedirect
                };
                
                fetch("http://api.sportradar.us/nba/trial/v8/en/games/2023/REG/schedule.json?api_key=xyrtk3e9hym8pxta3v9t47my", options3)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                
            


        this.productService.getProducts().then(data => this.products = data);
        this.productService.getProducts().then(data => this.productsThisWeek = data);
        this.productService.getProductsMixed().then(data => this.productsLastWeek = data);

        this.ordersChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [{
                label: 'Revenue',
                data: [31, 83, 69, 29, 62, 25, 59, 26, 46],
                borderColor: [
                    '#f1b263',
                ],
                backgroundColor: [
                    'rgba(241, 178, 99, 0.1)'
                ],
                borderWidth: 2,
                fill: true,
                borderDash: [3, 6],
                tension: .4
            }, {
                label: 'Cost',
                data: [67, 98, 27, 88, 38, 3, 22, 60, 56],
                borderColor: [
                    '#2f8ee5',
                ],
                backgroundColor: [
                    'rgba(47, 142, 229, 0.05)',
                ],
                borderWidth: 2,
                fill: true,
                pointRadius: 3,
                tension: .4
            }],
            responsive: true
        };

        this.trafficChart = this.getTrafficChartData();

        this.trafficOptions = {
            plugins: {
                legend: {
                    display: false,
                }
            },
            responsive: true,
            cutout: 70
        };

        this.appMain['refreshTrafficChart'] = () => {
            this.trafficChart = this.getTrafficChartData();
        };

        this.goalChart = {
            labels: [
                'Complete',
                'Not Complete',
                'Extra Tasks',
            ],
            datasets: [{
                data:  [183, 62, 10],
                backgroundColor: [
                    '#ffffff',
                    'rgba(255,255,255,.2)',
                    'rgba(255,255,255,.5)',
                ],
                borderWidth: 0,
            }]
        };

        this.goalOptions = {
            plugins: {
                legend: {
                    display: false,
                }
            },
            responsive: true,
        };

        this.items = [
            {label: 'View Profile', icon: 'pi pi-user'},
            {label: 'Update Profile', icon: 'pi pi-refresh'},
            {label: 'Delete Profile', icon: 'pi pi-trash'},
        ];

        this.orderWeek = [
            {name: 'This Week', code: '0'},
            {name: 'Last Week', code: '1'}
        ];

        
    }

    showPlayer(result:any)
    {
        console.log("drinnen");
        console.log(result);

        var output = "";
        console.log(result[0]);

        console.log(result[0].home_team_score);
    
    }

    loadName()
    {
        console.log("name:");
        const accessLogin = localStorage.getItem('accesstoken');
        const refreshToken = localStorage.getItem('refreshtoken');

        const decodedToken: any = jwtDecode(accessLogin);

        const exp: number = decodedToken.sub;

        const url1 = `https://ballermetrics-backend2.onrender.com/tradeGroupUser/getName/`+ exp;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessLogin);

        var requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };

        fetch(url1, requestOptions)
        .then(res => {
        if(!res.ok)
        {
            console.log("fetch fehler");
        }
        return res.json();
        }).then(json => {
        console.log(json);
            

        
        }).catch(err => console.log(err));

    }

    

    showPlayers(json:any)
    {
        var output="";

        for(let i in json)
        {
            const firstname = json[i]['first_name'];
            const lastName = json[i]['last_name'];
            const position = json[i]['position']

            console.log(firstname+lastName+position);

            output+=(`<li>
                    <div class="person">
                        <img src="assets/layout/images/dashboard/leader-1.png" alt="poseidon-layout" />
                        <p>${firstname} ${lastName}</p>
                    </div>
                    <div class="person-numbers">
                        <h6>Position: ${position}</h6>
                        
                    </div>
                </li>`);
        }
        document.getElementById('playerList').innerHTML = output;
    }

    

    getTrafficChartData() {
        return {
            labels: [
                'Add View',
                'Total View',
            ],
            datasets: [{
                data:  [48, 52],
                backgroundColor: [
                    getComputedStyle(document.body).getPropertyValue('--primary-dark-color') || '#2c84d8',
                    getComputedStyle(document.body).getPropertyValue('--content-alt-bg-color') || '#B1B9C9',
                ],
                borderWidth: 0,
            }]
        };
    }

    changeDataset(event) {
        const dataSet = [
            [31, 83, 69, 29, 62, 25, 59, 26, 46],
            [40, 29, 7, 73, 81, 69, 46, 21, 96],
        ];
        const dataSet2 = [
            [67, 98, 27, 88, 38, 3, 22, 60, 56],
            [74, 67, 11, 36, 100, 49, 34, 56, 45],
        ];

        this.activeOrders = parseInt(event.currentTarget.getAttribute('data-index'));

        this.ordersChart.datasets[0].data = dataSet[parseInt(event.currentTarget.getAttribute('data-index'))];
        this.ordersChart.datasets[1].data = dataSet2[parseInt(event.currentTarget.getAttribute('data-index'))];
        this.ordersChart.datasets[0].label = event.currentTarget.getAttribute('data-label');
        this.ordersChart.datasets[0].borderColor = event.currentTarget.getAttribute('data-stroke');
    }

    changeTrafficset(event){
        const traffidDataSet = [
            [48, 52],
            [26, 74],
            [12, 88],
        ];
        this.activeTraffic = parseInt(event.currentTarget.getAttribute('data-index'));

        this.trafficChart.datasets[0].data = traffidDataSet[parseInt(event.currentTarget.getAttribute('data-index'))];
    }

    recentSales(event) {
        if (event.value.code === '0') {
            this.products = this.productsThisWeek;
        } else {
            this.products = this.productsLastWeek;
        }
    }

    updateChartOptions() {
        if(this.config.dark){
            this.applyDarkTheme();
        } else {
            this.applyLightTheme();
        }
    }

    applyDarkTheme() {

        this.ordersOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
    }

    applyLightTheme() {

        this.ordersOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#A0A7B5'
                    }
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                x: {
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
    }

    ngOnDestroy() {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
}
