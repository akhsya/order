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
            <div class="col-sm-2">
                <ul>
                    <li>Promo</li>
                    <li>Popular</li>
                    <li>Indonesia</li>
                </ul>
            </div>
            <div class="col-sm-10">
                <form class="form-horizontal" action="/action_page.php">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <input type="text" v-model="domain" class="form-control input-lg" placeholder="Enter domain">
                        </div>
                    </div>
                </form>

                <div class="row">
                    <div class="col-sm-6">
                        <div class="panel panel-default panel-tld">
                            <div class="panel-heading"><strong>Ekstensi Domain yang Tersedia</strong></div>
                            <div class="panel-body">
                                <ul class="list-unstyled list-tld row">
                                    <li class="col-sm-3 col-xs-6 list-tld" v-for="ext in exts" :key="ext.id">
                                        <label class="btn btn-default btn-sm">
                                        <input type="checkbox" :value="ext.ext" v-model="choices">  
                                        {{ ext.ext }} 
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="panel panel-default">
                            <div class="panel-heading"><b>Result {{ domain }}</b></div>
                            <div class="panel-body">
                                <div v-if="choices.length === 0">
                                    <p><i>empty</i></p>
                                </div>
                                <div v-else>
                                    <div v-if="sttsReq.length === 0" class="text-center">
                                        <i class="fa fa-spin fa-spinner fa-4x"></i>
                                        <p>Please wait ...</p>
                                    </div>
                                    <div>
                                        <ul>
                                            <li v-for="rs in requestAPI"><b>{{rs.domain}}</b> {{ rs.stts }}</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col-sm-5">
                
            </div>
        </div>        
    </div>
    `,
    data() {
        return {
            exts : ext_rekomended,
            choices : [],
            domain : "akhulsyaifudin",
            sttsReq : []
        }
    },
    computed: {
        requestAPI() {
            // let URLAPI = "https://order2.rumahweb.com/order/siapa/domain/";
            let URLAPI = "http://ron-swanson-quotes.herokuapp.com/v2/quotes/";

            let dom = this.domain
            let stts = []
            let choices = this.choices

            for (let i = 0; i < choices.length; i++){

                let x = dom+choices[i]

                // logs
                console.log("request API : ".URLAPI+x)

                axios.get(URLAPI+x)
                .then(function(res){
                    stts.push(
                        {
                            "domain" : x,
                            "stts" : res.data
                        }
                    )
                })
            }
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