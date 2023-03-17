var L_selec = "Estados Unidos Mexicanos_0700,";
var L_periodo = "2020";
var token_ = "970a2694-e217-5311-12b9-b9c1b9403d4c";
var ruta_ = "https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/";

var site = {
    init: function () {
        site.tablero();
        site.pintaAreasGeograficas(false);
        site.printPeriodos();
    },
    tablero: function () {
        site.pintaFiltros("cero");
        var headers = {};
        var url = ruta_ + "/INDICATOR/1002000001,1002000002,1002000003/es/07000001/true/BISE/2.0/" + token_ + "?type=json";

        $.getJSON(url, { headers: headers }, function (data) {
            var lista = data.Series; var valor;
            for (var i = 0; i < lista.length; i++) {
                valor = numeral(lista[i].OBSERVATIONS[0].OBS_VALUE).format("0,0.");
                if (lista[i].INDICADOR === "1002000001") {
                    document.getElementById("ttxt").innerText = valor + " personas en Aguascalientes, México, en el año " + lista[i].OBSERVATIONS[0].TIME_PERIOD + ".";
                }
                else if (lista[i].INDICADOR === "1002000002") {
                    document.getElementById("perh").innerText = "| " + lista[i].OBSERVATIONS[0].TIME_PERIOD;
                    document.getElementById("valueh").innerText = valor;
                    document.getElementById("ageoh").innerText = "Aguascalientes";
                }
                else {
                    document.getElementById("perm").innerText = "| " + lista[i].OBSERVATIONS[0].TIME_PERIOD;
                    document.getElementById("valuem").innerText = valor;
                    document.getElementById("ageom").innerText = "Aguascalientes";
                }
            }
        });

        var indicadores = [
            { "indicador": "6200240378", "nombre": "Porcentaje de mujeres de 0 a 4 años" },
            { "indicador": "6200240300", "nombre": "Porcentaje de hombres de 0 a 4 años" },
            { "indicador": "6200240312", "nombre": "Porcentaje de mujeres de 5 a 9 años" },
            { "indicador": "6200240445", "nombre": "Porcentaje de hombres de 5 a 9 años" },
            { "indicador": "6200240354", "nombre": "Porcentaje de mujeres de 10 a 14 años" },
            { "indicador": "6200240311", "nombre": "Porcentaje de hombres de 10 a 14 años" },
            { "indicador": "6200240384", "nombre": "Porcentaje de mujeres de 15 a 19 años" },
            { "indicador": "6200240343", "nombre": "Porcentaje de hombres de 15 a 19 años" },
            { "indicador": "6200240356", "nombre": "Porcentaje de mujeres de 20 a 24 años" },
            { "indicador": "6200240520", "nombre": "Porcentaje de hombres de 20 a 24 años" },
            { "indicador": "6200240548", "nombre": "Porcentaje de mujeres de 25 a 29 años" },
            { "indicador": "6200240486", "nombre": "Porcentaje de hombres de 25 a 29 años" },
            { "indicador": "6200240549", "nombre": "Porcentaje de mujeres de 30 a 34 años" },
            { "indicador": "6200240518", "nombre": "Porcentaje de hombres de 30 a 34 años" },
            { "indicador": "6200240443", "nombre": "Porcentaje de mujeres de 35 a 39 años" },
            { "indicador": "6200240357", "nombre": "Porcentaje de hombres de 35 a 39 años" },
            { "indicador": "6200240341", "nombre": "Porcentaje de mujeres de 40 a 44 años" },
            { "indicador": "6200240423", "nombre": "Porcentaje de hombres de 40 a 44 años" },
            { "indicador": "6200240377", "nombre": "Porcentaje de mujeres de 45 a 49 años" },
            { "indicador": "6200240532", "nombre": "Porcentaje de hombres de 45 a 49 años" },
            { "indicador": "6200240507", "nombre": "Porcentaje de mujeres de 50 a 54 años" },
            { "indicador": "6200240533", "nombre": "Porcentaje de hombres de 50 a 54 años" },
            { "indicador": "6200240328", "nombre": "Porcentaje de mujeres de 55 a 59 años" },
            { "indicador": "6200240444", "nombre": "Porcentaje de hombres de 55 a 59 años" },
            { "indicador": "6200240426", "nombre": "Porcentaje de mujeres de 60 a 64 años" },
            { "indicador": "6200240410", "nombre": "Porcentaje de hombres de 60 a 64 años" },
            { "indicador": "6200240427", "nombre": "Porcentaje de mujeres de 65 a 69 años" },
            { "indicador": "6200240388", "nombre": "Porcentaje de hombres de 65 a 69 años" },
            { "indicador": "6200240342", "nombre": "Porcentaje de mujeres de 70 a 74 años" },
            { "indicador": "6200240425", "nombre": "Porcentaje de hombres de 70 a 74 años" },
            { "indicador": "6200240310", "nombre": "Porcentaje de mujeres de 75 a 79 años" },
            { "indicador": "6200240330", "nombre": "Porcentaje de hombres de 75 a 79 años" },
            { "indicador": "6200240379", "nombre": "Porcentaje de mujeres de 80 a 84 años" },
            { "indicador": "6200240475", "nombre": "Porcentaje de hombres de 80 a 84 años" },
            { "indicador": "6200240344", "nombre": "Porcentaje de mujeres de 85 años" },
            { "indicador": "6200240411", "nombre": "Porcentaje de hombres de 85 años" }];

        Graficas.tabulador(["2020"], [{ nombre: "Aguascalientes", clave: "07000001" }], indicadores, "reports0");
        Graficas.piramide(["2020"], [{ nombre: "Aguascalientes", clave: "07000001" }], indicadores, "reports1");
    },
    pintaAreasGeograficas: function (multiple) {
        var areasgeo_ = "0700,07000001,07000002,07000003,07000004,07000005,07000006,07000007,07000006,07000007,07000008,07000009,07000010,07000011,07000012";
        var url = ruta_ + "/CL_GEO_AREA/" + areasgeo_ + "/es/BISE/2.0/" + token_ + "?type=json";
        var headers = {};
        var cont = 0;
        $.getJSON(url, { headers: headers }, function (data) {
            var datos = data.CODE; var li, a, i, span;
            for (var d = 0; d < datos.length; d++) {
                        cont++;
                        li = document.createElement("li");
                        a = document.createElement("a");

                       li.appendChild(a);
                       i = document.createElement("input");
                       i.style.marginRight = "5px";
                       i.id = datos[d].Description + "_" + datos[d].value;
                       if (multiple) {
                           i.type = "checkbox";
                           i.setAttribute("onclick", "javascript:site.clicAgeo(this.id," + multiple + ")");
                       }
                       else {
                           i.type = "radio";
                           i.name = "ageo_radio";
                           i.setAttribute("onclick", "javascript:site.clicAgeo(this.id," + multiple + ")");
                       }

                        if (cont === 1) {
                            i.checked = true;
                        }
                        a.appendChild(i);

                        span = document.createElement("span");
                        span.innerHTML = datos[d].Description;
                        a.appendChild(span);
                        document.getElementById("ageo-nav").appendChild(li);

                    }
        });
    },
    printPeriodos: function () {
        var datos = ["2010", "2015", "2020"];
        var li, a, i, span;

        for (var d = 0; d < datos.length; d++) {
            li = document.createElement("li");
            a = document.createElement("a");

            li.appendChild(a);
            i = document.createElement("input");
            i.style.marginRight = "5px";
            i.id = datos[d];
            i.type = "radio";
            i.name = "per_radio";
            i.setAttribute("onclick", "javascript:site.clicPeriodo(this.id)");

            if (d === datos.length - 1) {
                i.checked = true;
            }
            a.appendChild(i);
            span = document.createElement("span");
            span.innerHTML = datos[d];
            a.appendChild(span);
            document.getElementById("periodos-nav").appendChild(li);
        }
    },
    secciones: function (id) {
        //reinicia
        L_selec = "Estados Unidos Mexicanos_0700,";
        var L_periodo = "2020";

        //menu-header
        var allheader = $(".mnheader");
        allheader.removeClass("activo");
        for (ah = 0; ah < allheader.length; ah++) {
            if (allheader[ah].id === "mn_"+ id) {
                $("#" + allheader[ah].id).addClass("active");
            }
        }

        //contenido
        var all = $(".mn");
        for (a = 0; a < all.length; a++) {
            if (all[a].id === id) {
                $("#" + all[a].id).removeClass("hide");
                $("#" + all[a].id).addClass("show");
            }
            else {
                $("#" + all[a].id).removeClass("show");
                $("#" + all[a].id).addClass("hide");
            }
        }

        //txt_nav
        setTimeout(function () { site.prepareNav(id); }, 1000);
        var title = document.getElementById("txt_nav");
        switch (id) {
            case "cero":
                title.innerText = "Tablero";
                break;
            case "uno":
                title.innerText = "Comparativo";
                break;
            case "dos":
                title.innerText = "Grupos";
                break;
            case "tres":
                title.innerText = "Tabulado";
                break;
        }

        //Filtros y escenario
        $("#ageo-nav").contents().remove();
        $("#periodos-nav").contents().remove();
        site.pintaFiltros(id);
        switch (id) {
            case "uno":
                site.pintaAreasGeograficas(true);
                site.printPeriodos();
                var aAreas = "Estados Unidos Mexicanos_0700";
                site.goComparativo(aAreas, L_periodo);
                break;
            case "dos":
                site.pintaAreasGeograficas(false);
                site.printPeriodos();
                site.goGrupos("Estados Unidos Mexicanos_0700", L_periodo);
                break;
            case "tres":
                site.pintaAreasGeograficas(false);
                site.printPeriodos();
                site.goTabulado("Estados Unidos Mexicanos_0700", L_periodo);
                break;
        }
    },
    pintaFiltros: function (id) {
        switch (id) {
            case "cero":
                document.getElementById("li_ageo").style.display = "none";
                document.getElementById("li_per").style.display = "none";
                document.getElementById("btn_consulta").style.display = "none";
                break;
            case "uno":
            case "dos":
            case "tres":
                document.getElementById("li_ageo").style.display = "block";
                document.getElementById("li_per").style.display = "block";
                document.getElementById("btn_consulta").style.display = "block";
                break;
        }
    },
    clicAgeo: function (id, multiple) {
        var ent = id;
        if (multiple) {
            if (L_selec.indexOf(',' + ent + ',') === -1) {
                //agrega elementos
                L_selec = L_selec + ent;
                L_selec = L_selec + ',';
            }
            else {
                var splEnt = L_selec.substring(0, L_selec.length - 1).split(",");
                for (i = 0; i < splEnt.length; i++) {
                    if (splEnt[i] !== "") {
                        if (splEnt[i] === ent) {
                            //borra elemento
                            splEnt.splice(i, 1);
                        }
                    }
                }
                //reasigna valores
                L_selec = ",";
                for (i = 0; i < splEnt.length; i++) {
                    if (splEnt[i] !== '') {
                        L_selec = L_selec + splEnt[i] + ',';
                    }
                }
            }
        }
        else {
            L_selec = id;
        }
    },
    clicPeriodo: function (id) {
       L_periodo = id;
    },
    goComparativo: function (ageo, periodo) {
        //Titulo
        document.getElementById("title").innerText="Población total";

        //trata areas geográficas
        var vecageo = [];
        var arr = ageo.split(",");
        var obj = {};
         for (var a = 0; a < arr.length; a++) {
                if (arr[a] !== "") {
                    obj = {};
                    obj.nombre = arr[a].split("_")[0];
                    obj.clave = arr[a].split("_")[1];
                    vecageo.push(obj);
                }
            }

        var aPeriodos = [periodo];
        var indicador = ["1002000001"]
        // grafico comparativo - poblacion total en un periodo
        Graficas.comparativo(aPeriodos, vecageo, indicador);
        setTimeout(function () { site.prepareNav("uno"); }, 1000);
    },
    goGrupos: function (ageo, periodo) {
        //Titulo
        document.getElementById("title").innerText = "Población total, hombres - mujeres";

        var aPeriodos = [periodo];
        var indicadores = [
            { "indicador": "6200240378", "nombre": "Porcentaje de mujeres de 0 a 4 años" },
            { "indicador": "6200240300", "nombre": "Porcentaje de hombres de 0 a 4 años" },
            { "indicador": "6200240312", "nombre": "Porcentaje de mujeres de 5 a 9 años" },
            { "indicador": "6200240445", "nombre": "Porcentaje de hombres de 5 a 9 años" },
            { "indicador": "6200240354", "nombre": "Porcentaje de mujeres de 10 a 14 años" },
            { "indicador": "6200240311", "nombre": "Porcentaje de hombres de 10 a 14 años" },
            { "indicador": "6200240384", "nombre": "Porcentaje de mujeres de 15 a 19 años" },
            { "indicador": "6200240343", "nombre": "Porcentaje de hombres de 15 a 19 años" },
            { "indicador": "6200240356", "nombre": "Porcentaje de mujeres de 20 a 24 años" },
            { "indicador": "6200240520", "nombre": "Porcentaje de hombres de 20 a 24 años" },
            { "indicador": "6200240548", "nombre": "Porcentaje de mujeres de 25 a 29 años" },
            { "indicador": "6200240486", "nombre": "Porcentaje de hombres de 25 a 29 años" },
            { "indicador": "6200240549", "nombre": "Porcentaje de mujeres de 30 a 34 años" },
            { "indicador": "6200240518", "nombre": "Porcentaje de hombres de 30 a 34 años" },
            { "indicador": "6200240443", "nombre": "Porcentaje de mujeres de 35 a 39 años" },
            { "indicador": "6200240357", "nombre": "Porcentaje de hombres de 35 a 39 años" },
            { "indicador": "6200240341", "nombre": "Porcentaje de mujeres de 40 a 44 años" },
            { "indicador": "6200240423", "nombre": "Porcentaje de hombres de 40 a 44 años" },
            { "indicador": "6200240377", "nombre": "Porcentaje de mujeres de 45 a 49 años" },
            { "indicador": "6200240532", "nombre": "Porcentaje de hombres de 45 a 49 años" },
            { "indicador": "6200240507", "nombre": "Porcentaje de mujeres de 50 a 54 años" },
            { "indicador": "6200240533", "nombre": "Porcentaje de hombres de 50 a 54 años" },
            { "indicador": "6200240328", "nombre": "Porcentaje de mujeres de 55 a 59 años" },
            { "indicador": "6200240444", "nombre": "Porcentaje de hombres de 55 a 59 años" },
            { "indicador": "6200240426", "nombre": "Porcentaje de mujeres de 60 a 64 años" },
            { "indicador": "6200240410", "nombre": "Porcentaje de hombres de 60 a 64 años" },
            { "indicador": "6200240427", "nombre": "Porcentaje de mujeres de 65 a 69 años" },
            { "indicador": "6200240388", "nombre": "Porcentaje de hombres de 65 a 69 años" },
            { "indicador": "6200240342", "nombre": "Porcentaje de mujeres de 70 a 74 años" },
            { "indicador": "6200240425", "nombre": "Porcentaje de hombres de 70 a 74 años" },
            { "indicador": "6200240310", "nombre": "Porcentaje de mujeres de 75 a 79 años" },
            { "indicador": "6200240330", "nombre": "Porcentaje de hombres de 75 a 79 años" },
            { "indicador": "6200240379", "nombre": "Porcentaje de mujeres de 80 a 84 años" },
            { "indicador": "6200240475", "nombre": "Porcentaje de hombres de 80 a 84 años" },
            { "indicador": "6200240344", "nombre": "Porcentaje de mujeres de 85 años" },
            { "indicador": "6200240411", "nombre": "Porcentaje de hombres de 85 años" }];
        var aAreas = [
            { nombre: ageo.split("_")[0], clave: ageo.split("_")[1] }
        ]
        Graficas.piramide(aPeriodos, aAreas, indicadores, "divPiramide");
        setTimeout(function () { site.prepareNav("dos"); }, 1000);
    },
    goTabulado: function (ageo, periodo) {
        //Titulo
        document.getElementById("title").innerText = "Población total, hombres - mujeres";

        $("#divTabulador").contents().remove();
        var aPeriodos = [periodo];
        var aAreas = [
            { nombre: ageo.split("_")[0], clave: ageo.split("_")[1] }
        ]
        var indicadores = [
            { "indicador": "6200240378", "nombre": "Porcentaje de mujeres de 0 a 4 años" },
            { "indicador": "6200240300", "nombre": "Porcentaje de hombres de 0 a 4 años" },
            { "indicador": "6200240312", "nombre": "Porcentaje de mujeres de 5 a 9 años" },
            { "indicador": "6200240445", "nombre": "Porcentaje de hombres de 5 a 9 años" },
            { "indicador": "6200240354", "nombre": "Porcentaje de mujeres de 10 a 14 años" },
            { "indicador": "6200240311", "nombre": "Porcentaje de hombres de 10 a 14 años" },
            { "indicador": "6200240384", "nombre": "Porcentaje de mujeres de 15 a 19 años" },
            { "indicador": "6200240343", "nombre": "Porcentaje de hombres de 15 a 19 años" },
            { "indicador": "6200240356", "nombre": "Porcentaje de mujeres de 20 a 24 años" },
            { "indicador": "6200240520", "nombre": "Porcentaje de hombres de 20 a 24 años" },
            { "indicador": "6200240548", "nombre": "Porcentaje de mujeres de 25 a 29 años" },
            { "indicador": "6200240486", "nombre": "Porcentaje de hombres de 25 a 29 años" },
            { "indicador": "6200240549", "nombre": "Porcentaje de mujeres de 30 a 34 años" },
            { "indicador": "6200240518", "nombre": "Porcentaje de hombres de 30 a 34 años" },
            { "indicador": "6200240443", "nombre": "Porcentaje de mujeres de 35 a 39 años" },
            { "indicador": "6200240357", "nombre": "Porcentaje de hombres de 35 a 39 años" },
            { "indicador": "6200240341", "nombre": "Porcentaje de mujeres de 40 a 44 años" },
            { "indicador": "6200240423", "nombre": "Porcentaje de hombres de 40 a 44 años" },
            { "indicador": "6200240377", "nombre": "Porcentaje de mujeres de 45 a 49 años" },
            { "indicador": "6200240532", "nombre": "Porcentaje de hombres de 45 a 49 años" },
            { "indicador": "6200240507", "nombre": "Porcentaje de mujeres de 50 a 54 años" },
            { "indicador": "6200240533", "nombre": "Porcentaje de hombres de 50 a 54 años" },
            { "indicador": "6200240328", "nombre": "Porcentaje de mujeres de 55 a 59 años" },
            { "indicador": "6200240444", "nombre": "Porcentaje de hombres de 55 a 59 años" },
            { "indicador": "6200240426", "nombre": "Porcentaje de mujeres de 60 a 64 años" },
            { "indicador": "6200240410", "nombre": "Porcentaje de hombres de 60 a 64 años" },
            { "indicador": "6200240427", "nombre": "Porcentaje de mujeres de 65 a 69 años" },
            { "indicador": "6200240388", "nombre": "Porcentaje de hombres de 65 a 69 años" },
            { "indicador": "6200240342", "nombre": "Porcentaje de mujeres de 70 a 74 años" },
            { "indicador": "6200240425", "nombre": "Porcentaje de hombres de 70 a 74 años" },
            { "indicador": "6200240310", "nombre": "Porcentaje de mujeres de 75 a 79 años" },
            { "indicador": "6200240330", "nombre": "Porcentaje de hombres de 75 a 79 años" },
            { "indicador": "6200240379", "nombre": "Porcentaje de mujeres de 80 a 84 años" },
            { "indicador": "6200240475", "nombre": "Porcentaje de hombres de 80 a 84 años" },
            { "indicador": "6200240344", "nombre": "Porcentaje de mujeres de 85 años" },
            { "indicador": "6200240411", "nombre": "Porcentaje de hombres de 85 años" }];

        Graficas.tabulador(aPeriodos, aAreas, indicadores,"divTabulador");
        setTimeout(function () { site.prepareNav("tres"); }, 1000);
    },
    preparaFiltros: function () {
        var escenario = document.getElementById("txt_nav").innerText;
        switch (escenario) {
            case "Tablero":
                break;
            case "Comparativo":
                site.goComparativo(L_selec, L_periodo);
                break;
            case "Grupos":
                site.goGrupos(L_selec, L_periodo);
                break;
            case "Tabulado":
                site.goTabulado(L_selec, L_periodo);
                break;
        }
    },
    prepareNav: function (id) {
        if (id !== "cero") {
            if (id === "uno") {
                document.getElementById("txt_ent").style.display = "none";
            } else {
                document.getElementById("txt_ent").innerHTML = $("input[type='radio'][name='ageo_radio']:checked")[0].id.split("_")[0];
                document.getElementById("txt_ent").style.display = "inline";
            }
            document.getElementById("txt_periodo").innerHTML = $("input[type='radio'][name='per_radio']:checked")[0].id.split("_")[0];
            document.getElementById("txt_periodo").style.display = "inline";
        }
    }
};