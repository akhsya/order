Vue.component("x-head",{
    template : `
    <nav class="navbar navbar-default" style="border-radius:0px">
        <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">{{title}}</a>
        </div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li>
            <li><a href="#">Page 3</a></li>
        </ul>
        </div>
    </nav>
    `
    ,
    data() {
        return {
            title : "akhul syaifudin"
        }
    },
})

Vue.component("x-newdomain",{
    template : `
    <div class="jumbotronr" style="margin-top:3%;border-radius:0px">
        <div class="row">
            <div class="col-sm-7">
                <form class="form-horizontal" action="/action_page.php">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <input type="text" v-model="domains" class="form-control input-lg" placeholder="Enter domain">
                        </div>
                    </div>
                </form>

                <div class="row">
                    <div class="col-sm-4">
                        <p>ext your choice is :</p>
                        <ul>
                            <li v-for="row in choices" >{{ row }}</li>
                        </ul>
                    </div>
                    <div class="col-sm-8">
                        <p>tes req</p>

                        <div v-if="sttsReq.length === 0">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped active" role="progressbar"
                                aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" style="width:99%">
                                99%
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul>
                                <li v-for="rs in requestAPI">{{rs.domain}} {{ rs.stts }}</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="panel panel-default panel-tld">
                    <div class="panel-heading"><strong>Ekstensi Domain yang Tersedia</strong></div>
                    <div class="panel-body">
                        <ul class="list-unstyled list-tld row">
                            <li class="col-sm-3 col-xs-6" v-for="ext in exts" :key="ext.id">
                                <label class="btn btn-default btn-sm">
                                <input type="checkbox" :value="ext.extD" v-model="choices">  
                                {{ ext.extD }} 
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>        
    </div>
    `,
    data() {
        return {
            exts : [
                {
                    id : 1,
                    extD : ".com"
                },
                {
                    id : 2,
                    extD : ".net"
                },
                {
                    id : 3,
                    extD : ".id"
                },
                {
                    id : 4,
                    extD : ".xyz"
                },

            ],
            choices : [],
            domains : "akhulsyaifudin",
            sttsReq : []
        }
    },
    methods: {
        ajax(ext){
            console.log(ext+" ajax request ...")
        },
    },
    computed: {
        requestAPI() {
            
            let dom = this.domains
            let stts = []
            let choices = this.choices

            for (let i = 0; i < choices.length; i++){
                let x = dom+choices[i]
                axios.get("https://order2.rumahweb.com/order/siapa/domain/"+x)
                .then(function(res){
                    stts.push(
                        {
                            "domain" : x,
                            "stts" : res.data
                        }
                    )
                })
            }
            // console.log(stts)
            return this.sttsReq = stts
            
        }
    }
})

Vue.component("x-transfer",{
    template : `
        <div>
            <div class="alert alert-success" style="margin-top:3%;border-radius:0px">
                <strong>transfer!</strong> Indicates a successful or positive action.
            </div>
        </div>
    `
})

Vue.component("x-hosting",{
    template : `
        <div>
            <div class="alert alert-info" style="margin-top:3%;border-radius:0px">
                <strong>hosting!</strong> Indicates a successful or positive action.
            </div>
        </div>
    `
})

Vue.component("x-tabs",{
    template : `
    <div>
        <ul class="nav nav-tabs">
            <li v-for="(tab, index) in tabs" :class="{ active : selectedTabs ===tab }" :key="index" @click="selectedTabs = tab">
                <a>{{tab}}</a>
            </li>
        </ul>

        <div v-show="selectedTabs === 'Domain Baru'">
            <x-newdomain></x-newdomain>
        </div>

        <div v-show="selectedTabs === 'Transfer'">
            <x-transfer></x-transfer>
        </div>

        <div v-show="selectedTabs === 'Hosting Saja'">
            <x-hosting></x-hosting>
        </div>

    </div>
    `,
    data() {
        return {
            tabs : ["Domain Baru", "Transfer", "Hosting Saja"],
            selectedTabs : "Domain Baru"
        }
    },
})

var componentLocal = {
    template :`
        <h1>componen local gaes</h1>
    ` 
}

var App = new Vue({
    el : "#app",
    data : {
        msg : "akhul syaifudin"
    },
    components :{
        xxx : componentLocal
    }
})