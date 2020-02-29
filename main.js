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

var compKategori = {
    template : 
    `
    <div>
        <ul class="list-group">
            <li :class="{active : selectedKat === kat}" class="list-group-item" v-for="(kat, index) in kategori" :key="index" @click="reqKategori(kat)" style="cursor:pointer">{{ kat }}</li>
        </ul>
    </div>
    `,
    data() {
        return {
            kategori    : ["Rekomendasi","Promo","Populer","Indonesia","Bisnis", "Hobi"],
            selectedKat : "Rekomendasi"
        }
    },
    methods: {
        reqKategori(kat){
            this.selectedKat = kat // for menu active
            var lower = kat.toLowerCase()
            
            this.$emit("changeExt", eval("ext_"+lower))  
           
        }
    },
}

Vue.component("x-newdomain",{
    template : `
    <div class="jumbotronr" style="margin-top:3%;border-radius:0px">
        <div class="row">
            <div class="col-sm-2">
                <compKategori @changeExt="updateExt($event)"></compKategori>
            </div>
            <div class="col-sm-10">
                
                <div class="row">
                    <div class="col-sm-5">
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
                            <div class="panel-footer">
                                <ul>
                                    <li v-for="row in choices">{{ row }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <div class="input-group">
                                        <input type="text" v-model="domain" class="form-control" placeholder="Enter domain">
                                        <span class="input-group-btn">
                                            <button class="btn btn-primary domain-button" @click="requestAPI" type="button">Search</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div class="panel panel-default">
                            <div class="panel-heading"><b>Result {{ domain }}</b></div>
                            <div class="panel-body">

                                <div v-show="sttsReq.length === 0" class="text-center">
                                    <i class="fa fa-spin fa-spinner fa-4x"></i>
                                    <p>Please wait ...</p>
                                </div>
                                <div v-show="sttsReq.length != 0">
                                    <table class="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th>Domain</th>
                                                <th>Harga</th>
                                                <th>Promo</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(row, index) in sttsReq" :key="index">
                                                <td>{{ row.domain }}</td>
                                                <td>
                                                    <span v-if="row.disc == 0">{{ row.price }}</span>
                                                    <span v-else><del>{{ row.price }}</del></span>
                                                </td>
                                                <td>{{ row.disc }}</td>
                                                <td>{{ row.stts }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
            exts        : ext_rekomendasi,
            choices     : [],
            domain      : "akhulsyaifudin",
            sttsReq     : [],
        }
    },
    components : {
        compKategori : compKategori
    },
    methods: {
        updateExt(extKategori){
            this.exts = extKategori
        },
        requestAPI() {
            let URLAPI = "https://order2.rumahweb.com/order/siapa/domain/";
            // let URLAPI = "https://ron-swanson-quotes.herokuapp.com/v2/quotes/";

            let domain = this.domain
                domain = domain.replace(/\s/g, '')
            this.domain = domain

            let stts = []
            let choices = this.choices
            for (let i = 0; i < choices.length; i++){

                let domainName = domain+"."+choices[i] 
                console.log("request to : "+URLAPI+domainName)

                axios.get(URLAPI+domainName)
                .then(function(res){
                    stts.push(
                        {
                            "domain" : domainName,
                            "stts" : res.data,
                            "price" : (typeof eval(price[0][choices[i]]) ==="undefined")?"belum set":eval(price[0][choices[i]])[1],
                            "disc" : (typeof eval(price[0][choices[i]]) ==="undefined")?0:eval(price[0][choices[i]])["disc"]
                        }
                    )
                })
                
            }
            this.sttsReq = stts
        }
    }
})

Vue.component("x-transfer",{
    template : `
        <div style="margin-top:3%">
        <div class="row">
            <div class="col-sm-5">
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="input-group">
                                <input type="text" v-model="domain" class="form-control" placeholder="Enter domain">
                                <span class="input-group-btn">
                                    <button class="btn btn-primary domain-button" @click="anapoora" type="button">Search</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-7">
                <div class="alert alert-success" v-if="status.length != 0">
                    <ul>
                        <li>{{ status.domain }}</li>
                        <li>{{ status.status }}</li>
                    </ul>
                </div>
            </div>
        </div>
        
        </div>
    `,
    data() {
        return {
            domain : "mtsmaarifnu1kemranjen.sch.id",
            status : []
        }
    },
    methods: {
        anapoora(){
            var domain  = this.domain
            var URL     = "https://order2.rumahweb.com/order/siapa/transfer/"+domain
            var current = this
            
            // axios.post("https://order2.rumahweb.com/order/searchhosting",{
            //     "transferdomain" : domain
            // })
            // .then(function(susukGolek){
            //     console.log(susukGolek)
            // })


            axios.get(URL).then(function(susuk){
                current.status =  {
                    "domain" :domain,
                    "status" :susuk.data 
                }
            })
        }
    },
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
            <li v-for="(tab, index) in tabs" :class="{ active : selectedTabs === tab }" :key="index" @click="selectedTabs = tab">
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
            selectedTabs : "Transfer"
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