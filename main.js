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
            this.selectedKat = kat
            var lower = kat.toLowerCase()
                // lowerExt = window["ext_"+lower] // convert to variable
                
            switch (lower){
                case "promo":
                    this.$emit("changeExt", ext_promo); // parsing parent
                    break

                case "populer":
                    this.$emit("changeExt", ext_populer); // parsing parent
                    break

                case "indonesia":
                    this.$emit("changeExt", ext_indonesia); // parsing parent
                    break

                case "bisnis":
                    this.$emit("changeExt", ext_bisnis); // parsing parent
                    break

                case "hobi":
                    this.$emit("changeExt", ext_hobi); // parsing parent
                    break

                default :
                    this.$emit("changeExt", ext_rekomendasi); // parsing parent
                    break
            }
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
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <div class="input-group">
                                        <input type="text" v-model="domain" class="form-control" placeholder="Enter domain">
                                        <span class="input-group-btn">
                                            <input class="btn btn-primary domain-button" type="button" value="Search">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </form>

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
        }
    },
    computed: {
        requestAPI() {
            let URLAPI = "https://order2.rumahweb.com/order/siapa/domain/";
            // let URLAPI = "https://ron-swanson-quotes.herokuapp.com/v2/quotes/";

            let dom = this.domain
                dom = dom.replace(/\s/g, '')
            this.domain = dom

            let stts = []
            let choices = this.choices

            for (let i = 0; i < choices.length; i++){

                let x = dom+choices[i]

                // logs
                console.log("request to : "+URLAPI+x)

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
        },
        
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