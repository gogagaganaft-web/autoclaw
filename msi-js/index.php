<!DOCTYPE html>
<html lang="ru">
<head>
    <title>Генератор отчетов</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <link rel="icon" type="image/png" href="css/favicon.png">
    <link rel="shortcut icon" type="image/png" href="css/favicon.png">

    <link rel="preload" href="css/icons/dxiconsmaterial.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="css/fonts/Roboto-400.woff2" as="font" type="font/woff2" crossorigin>

    <link rel="stylesheet" type="text/css" href="css/orange.dark.css"/>
    <link rel="stylesheet" type="text/css" href="css/api.css" />

</head>
<body class="dx-viewport">
         <div class="demo-container background-layer">
              <div class="flex-container">
    		    <div id="toolbar" class="animated"></div>
			<div id="drawer" style="padding-top: 15px;">
			    <div id="content">
                             <div id="reportContainer">
                                <div id="drillpopup"></div>
                            </div>
			       <div id="gridContainer"></div>
			    </div>
	               </div>
                </div>
          </div>
 <div id="pay-popup"></div>  
 <div id="editorPopup"></div>
 <div id="loadPanel"></div>


    <!--<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>-->
    <script async src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=b0301318-06c8-4fc5-a2f8-79a917802405&lang=ru_RU" type="text/javascript"></script>
    <script src="js/axios.min.js"></script>
    <script src="js/polyfill.min.js"></script>
    <script src="js/exceljs.min.js"></script>
    <script src="js/FileSaver.min.js"></script>
    <script src="js/jspdf.umd.min.js"></script>
    <script src="js/jquery.js"></script>
    <script src="js/cldr.min.js"></script>
    <script src="js/event.min.js"></script>
    <script src="js/supplemental.min.js"></script>
    <script src="js/unresolved.min.js"></script>
    <script type="text/javascript" src="js/globalize.min.js"></script>
    <script type="text/javascript" src="js/message.min.js"></script>
    <script type="text/javascript" src="js/number.min.js"></script>
    <script type="text/javascript" src="js/currency.min.js"></script>
    <script type="text/javascript" src="js/date.min.js"></script>
    <script src="js/atom.js"></script>
    <script src="js/msg.ru.js"></script>
    <script src="js/new_ru.js"></script>    
    <script src="data/env.js"></script>    
    <script src="data/rpt.js"></script>    
    <script src="./monaco/vs/loader.js"></script>
    <script type="module" src="./app_dev.js"></script>
</body>
</html>