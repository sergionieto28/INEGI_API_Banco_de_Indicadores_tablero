
google.charts.load('current',{'packages': ['corechart', 'bar']}); 
// google.charts.setOnLoadCallback(Graficas.comparativo()); 
var Graficas = {
    token:"970a2694-e217-5311-12b9-b9c1b9403d4c",
    headers:{},
    urlBase:"https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/",    
 
    apiDatosIndicador: async function(periodos, areas, indicador){
        var url = this.urlBase + "INDICATOR/$indicador/es/$areas/false/BISE/2.0/$token?type=json",
        url = url.replace("$indicador",indicador.join(","))
        url = url.replace("$token", this.token);
        var cvesAreas = areas.map(function(d){return d.clave}).join(",");
        url = url.replace("$areas", cvesAreas);
        return await $.getJSON(url, { headers: this.headers }, function (dataStructure) {  
            return dataStructure
        });
    },
    apiDatosIndicadorGrupos: async function(periodos, areas, indicador, callback){
        // separar indicadores
        var grupoIndicadoresA = indicador.filter(function(i, idx){ return idx <= 10})
        var grupoIndicadoresB = indicador.filter(function(i, idx){ return idx > 10 && idx <= 20})
        var grupoIndicadoresC = indicador.filter(function(i, idx){ return idx > 20  && idx <= 30})
        var grupoIndicadoresD = indicador.filter(function(i, idx){ return idx > 30})
        
        var url = url2 = url3 = url4 = this.urlBase + "INDICATOR/$indicador/es/$areas/false/BISE/2.0/$token?type=json";

        url = url.replace("$indicador",grupoIndicadoresA.join(","))
        url2 = url2.replace("$indicador",grupoIndicadoresB.join(","))
        url3 = url3.replace("$indicador",grupoIndicadoresC.join(","))
        url4 = url4.replace("$indicador",grupoIndicadoresD.join(","))

        url = url.replace("$token", this.token);
        url2 = url2.replace("$token", this.token);
        url3 = url3.replace("$token", this.token);
        url4 = url4.replace("$token", this.token);

        var cvesAreas = areas.map(function(d){return d.clave}).join(",");
        url = url.replace("$areas", cvesAreas);
        url2 = url2.replace("$areas", cvesAreas);
        url3 = url3.replace("$areas", cvesAreas);
        url4 = url4.replace("$areas", cvesAreas);

        console.log(url2)
        
        var response1 = await $.getJSON(url, { headers: this.headers }, function (dataStructure) {  
            return dataStructure
        });
        var response2 = await $.getJSON(url2, { headers: this.headers }, function (dataStructure) {  
            return dataStructure
        });

        var response3 = await $.getJSON(url3, { headers: this.headers }, function (dataStructure) {  
            return dataStructure
        });

        var response4 = await $.getJSON(url4, { headers: this.headers }, function (dataStructure) {  
            return dataStructure
        });       
        $.when(response1, response2, response3, response4).done(function(d1,d2,d3,d4){
            var allSeries = [];
            allSeries = [...d1.Series,...d2.Series,...d3.Series,...d4.Series]            
            callback(allSeries);
        })
    },
    /**
     * Grafica de barras comparativo de entidades
     * @param {*} periodos 
     * @param {*} areas 
     * @param {*} indicador 
     */
    comparativo: function(periodos, areas, indicador){
        // this.apiDatosComparativoTest(periodos, areas, indicador);
        this.apiDatosIndicador(periodos, areas, indicador).then(function(data){
            
            var aSeries = data.Series[0].OBSERVATIONS.filter(function(p){ return periodos[0].indexOf(p.TIME_PERIOD) > -1});
            // console.log(data)
            
            var dataset = aSeries.map(function(d){
                var entidadNombre = areas.filter(function(e){ 
                    return e.clave === d.COBER_GEO
                })[0].nombre;
                return [entidadNombre, parseFloat(d.OBS_VALUE), d.TIME_PERIOD, "#6aa3b4"]; 
            })   
           
            // ordenamiento de mayor a menor valor 
            dataset.sort(function(a, b){
                if (a[1] == b[1]) {
                    return 0;
                  }
                  if (a[1] > b[1]) {
                    return -1;
                  }
                  return 1;
            })
            // ordenamiento por nombre ascendente
            /* dataset.sort(function(a, b){
                var a = a[0].toLowerCase();
                var b = b[0].toLowerCase();
                if (a == b) {
                    return 0;
                  }
                  if (a < b) {
                    return -1;
                  }
                  return 1;
            }) */
            var data=google.visualization.arrayToDataTable([
                [
                    {role: "domain",Label: "Entidad",type: "string"},
                    {role: "data",Label: "Valor", type: "number"},
                    {role: "tooltip",Label: "Periodo", type: "string"},
                    {role: "style"}
                ]
            ]);

            data.addRows(dataset); 
            var view = new google.visualization.DataView(data); 
            view.setColumns([0,1,
                { calc: "stringify",
                  sourceColumn: 1,
                  type: "string",
                  role: "annotation" },
                3]);
            
            var tooltip = {
                trigger:"focus",
                isHtml: true
            }

            var options = {
                height:400,
                // title: 'Total poblacion por entidad federativa',
                chartArea: {width: '60%'},
                hAxis: {
                    title: 'Población',
                    minValue: 0
                },
                vAxis: {
                    title: 'Entidades'
                },
                legend:{position:"none"},
                animation:{
                    duration: 1000,
                    easing: 'in',
                },
                tooltip:tooltip
            };
        
            var chart = new google.visualization.BarChart(document.getElementById('divComparativo'));
            chart.draw(view, options);


        })
      
    },
    /**
     * Grafica de piramide datos de poblacion agrupados por sexo
     * @param {*} periodos 
     * @param {*} areas 
     * @param {*} indicadores 
     */
    piramide: function(periodos, areas, indicadores,id){   
        var categorias = ['0 a 4', '5 a 9', '10 a 14', '15 a 19', '20 a 24', '25 a 29', '30 a 34', '35 a 39', '40 a 44','45 a 49', '50 a 54', '55 a 59', '60 a 64', '65 a 69', '70 a 74', '75 a 79', '80 a 84','85'];
        // var categorias = ['0 a 4', '5 a 9', '10 a 14', '15 a 19', '20 a 24', '25 a 29'];

        var sIndicadores = indicadores.map(function(d){return d.indicador});
        this.apiDatosIndicadorGrupos(periodos, areas, sIndicadores, function(data){
            // console.log(data);
            var indicadoresDelPeriodo = data.map(function(d){
                var gperiodo = d.OBSERVATIONS.filter(function(g){return periodos.indexOf(g.TIME_PERIOD) > -1; })[0]
                gperiodo.indicador = d.INDICADOR;                 
                return gperiodo;
            })
            var indicadoresConNombre = indicadoresDelPeriodo.map(function(g){
                var nombreIndicadorGrupo = indicadores.filter(function(i){return i.indicador === g.indicador})[0].nombre
                g.NOMBRE = nombreIndicadorGrupo.replaceAll("Porcentaje de ","");
                return g;
            })
            // Sincronizar con la matriz
            // arma el dataset hombres           
            var oDatosHombres = categorias.map(function(c){
                var dato = indicadoresConNombre.filter(function(i){
                    var busca = "hombres de "+c+" años";
                    return busca === i.NOMBRE
                })[0]                
                return dato
            });
            var datasetHombres = []
           for(var x = 0; x < oDatosHombres.length; x++){
                if(oDatosHombres[x] !== undefined){
                    datasetHombres.push(-oDatosHombres[x].OBS_VALUE)
                }
           }
             // arma el dataset mujeres           
             var oDatosMujeres = categorias.map(function(c){
                var dato = indicadoresConNombre.filter(function(i){
                    var busca = "mujeres de "+c+" años";
                    // console.log(busca === c.NOMBRE? "si----->" : "no ",busca, c.NOMBRE, c.OBS_VALUE)
                    return busca === i.NOMBRE
                })[0]              
                return dato
            });
           var datasetMujeres = []
           for(var x = 0; x < oDatosMujeres.length; x++){
                if(oDatosMujeres[x] !== undefined){
                    datasetMujeres.push(+oDatosMujeres[x].OBS_VALUE)
                }
           }

           // ordenamiento de datos
        //    datasetHombres.reverse()
        //    datasetMujeres.reverse()
           categorias.reverse()

            Highcharts.chart(id, {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '',
                    align: 'left'
                },                
                xAxis: [{
                    categories: categorias,
                    reversed: false,
                    labels: {
                        step: 1
                    },
                    accessibility: {
                        description: 'Edad (hombres)'
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categorias,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    },
                    accessibility: {
                        description: 'Edad (mujeres)'
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            // return Math.abs(this.value) + '%';
                            return Math.abs(this.value) + '%';
                        }
                    },
                    accessibility: {
                        description: 'Población (porcentaje)',
                        rangeDescription: 'Rango: 0 to 5%'
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', edad ' + this.point.category + '</b><br/>' +
                            // 'Población: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1) + '%';
                            'Población: ' + Highcharts.numberFormat(Math.abs(this.point.y), 2) + '%';
                    }
                },

                series: [{
                    name: 'Hombres',
                    color:"#0063c0",
                    data: datasetHombres
                }, {
                    name: 'Mujeres',
                    color:"#e5717e",
                    data: datasetMujeres
                }],
                credits:""
            });
        })
        
    },
    tabulador: function(periodos, areas, indicadores,id){
        var categorias = ['0 a 4', '5 a 9', '10 a 14', '15 a 19', '20 a 24', '25 a 29', '30 a 34', '35 a 39', '40 a 44','45 a 49', '50 a 54', '55 a 59', '60 a 64', '65 a 69', '70 a 74', '75 a 79','80 a 84', '85'];
        // console.log(categorias);
        var sIndicadores = indicadores.map(function(d){return d.indicador});
        this.apiDatosIndicadorGrupos(periodos, areas, sIndicadores,function(data){
            // console.log(data);
            var indicadoresDelPeriodo = data.map(function(d){
                var gperiodo = d.OBSERVATIONS.filter(function(g){return periodos.indexOf(g.TIME_PERIOD) > -1; })[0]
                gperiodo.indicador = d.INDICADOR;                 
                return gperiodo;
            })
            var indicadoresConNombre = indicadoresDelPeriodo.map(function(g){
                var nombreIndicadorGrupo = indicadores.filter(function(i){return i.indicador.toString() === g.indicador.toString()})[0].nombre
                g.NOMBRE = nombreIndicadorGrupo.replaceAll("Porcentaje de ",""); 
                var cleanNombre = g.NOMBRE.replaceAll("hombres de ",""); 
                cleanNombre.replaceAll("mujeres de ")
                g.ORDEN = parseInt(cleanNombre.split(" ")[0]);
                return g;
            })
           console.log(indicadoresConNombre);
            // Sincronizar con la matriz
            // arma el dataset hombres           
            var oDatosHombres = categorias.map(function(c){
                var dato = indicadoresConNombre.filter(function(i){
                    var busca = "hombres de "+c+" años";
                    return busca === i.NOMBRE                    
                })[0]                
                return dato
            });
            // console.log(oDatosHombres);
            oDatosHombres = oDatosHombres.filter(function(d){
                return d !== undefined
            })
            // ordenamiento de mayor a menor valor 
            oDatosHombres.sort(function(a, b){                
                if (a.ORDEN < b.ORDEN) {
                    return 0;
                  }
                  if (a.ORDEN > b.ORDEN) {
                    return -1;
                  }
                  return 1;
            })

             // arma el dataset mujeres           
             var oDatosMujeres = categorias.map(function(c){
                var dato = indicadoresConNombre.filter(function(i){
                    var busca = "mujeres de "+c+" años";
                    // console.log(busca === c.NOMBRE? "si----->" : "no ",busca, c.NOMBRE, c.OBS_VALUE)
                    return busca === i.NOMBRE
                })[0]              
                return dato
            });
            // oDatosMujeres.revert()
            oDatosMujeres = oDatosMujeres.filter(function(d){
                return d !== undefined
            })
             // ordenamiento de mayor a menor valor 
            oDatosMujeres.sort(function(a, b){                
                if (a.ORDEN < b.ORDEN) {
                    return 0;
                  }
                  if (a.ORDEN > b.ORDEN) {
                    return -1;
                  }
                  return 1;
            })

           // tabla
           var table = document.createElement("table")
           var head = document.createElement("thead")
           var body = document.createElement("tbody")
           var tr = document.createElement("tr")
           var th = document.createElement("th")
           var td = document.createElement("td")

           table.id = "tablaedades";table.className = "table table-bordered "
           table.append(head)
           table.append(body);

           // encabezado
           var trEncabezado = tr.cloneNode();
           var tdCol1 = th.cloneNode(); tdCol1.textContent = "Rango"; tdCol1.className = "text-center" 
           var tdCol2 = th.cloneNode(); tdCol2.textContent = "Hombres (%)"; tdCol2.className = "text-center"
           var tdCol3 = th.cloneNode(); tdCol3.textContent = "Mujeres (%)"; tdCol3.className = "text-center"
           trEncabezado.append(tdCol1)
           trEncabezado.append(tdCol2)
           trEncabezado.append(tdCol3)
           head.append(trEncabezado);
           head.className = "table-light"

           // filas
            var dataset = [];
            var totalColumnas = indicadores.length / 2;
            
           for(col = 0; col < totalColumnas; col++){
                var r = tr.cloneNode();
                for(ren = 0; ren < indicadores.length; ren++){
                    if(oDatosHombres[col] != undefined){
                        var celda = td.cloneNode()
                        celda.textContent = (categorias[col] !== "85")? categorias[col] : categorias[col]+"+";
                        celda.className = "text-center"
                        var celdaH = td.cloneNode()
                        
                        celdaH.textContent = parseFloat(oDatosHombres[col].OBS_VALUE).toFixed(2);
                        celdaH.className = "text-end"
                        var celdaM = td.cloneNode()
                        celdaM.textContent = parseFloat(oDatosMujeres[col].OBS_VALUE).toFixed(2);
                        celdaM.className = "text-end"
                    }
                }
                r.append(celda);
                r.append(celdaH);
                r.append(celdaM);
                body.append(r)
           }


           document.getElementById(id).append(table);
        })        
    }
}

