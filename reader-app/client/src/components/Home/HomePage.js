import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from 'react-router-dom';

import '../../css/Home.css';
import UploadFile from './UploadFile.js';
import HelpPage from '../HelpPage.js';
import PregledDokumenata from './PregledDokumenata.js';
import PregledCitata from './PregledCitata.js';
const axios = require('axios');
var jeste = 1;
var jeste2= 1;
var broj = 0;
var sel;
var range;
var listacvorovastranice;
var listaKoordinata = [];
var listaInnerHtml = [];
var listaTagName = [];
var listaData = [];
var citat;
//Pomocne funkcije

//Vraca top i left koordinatu
function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}

function start(el) {
  if (el.isStart) {
    return true;
  }
  }
  function end(el) {
    if (el.isEnd) {
      return true;
    }
    }

//Rekreira range
function buildRange(left1,top1,left2,top2,startOffset, endOffset, nodeData, nodeHTML, nodeTagName,nodeData2, nodeHTML2, nodeTagName2){

   var startNode2 = document.elementsFromPoint(left1, top1);
   var endNode2 = document.elementsFromPoint(left2, top2);
  // alert(startNode2.length);
   //alert(endNode2.length);
    //var cDoc = document.getElementById('content-frame').contentDocument;
    //var cDoc = startNode2[1];

    //find start node
    for(var j=0; j< startNode2.length; j++){
      var tagList = startNode2[j].getElementsByTagName(nodeTagName);
      //console.log(nodeTagName);
      //console.log(tagList.length);

        // find the parent element with the same innerHTML
        for (var i = 0; i < tagList.length; i++) {
            //console.log(tagList[i].innerHTML);
            //console.log(nodeHTML);
            if (tagList[i].innerHTML == nodeHTML) {
              var foundEle = tagList[i];
            }
          }

        // find the node within the element by comparing node data
        if(foundEle !== undefined ) {
          var nodeList = foundEle.childNodes;
          for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].data == nodeData) {
              var foundNode = nodeList[i];
            }
          }
          var range = document.createRange();
          range.setStart(foundNode, startOffset);
          break;
        }
  }

  //find end node
  for(var j=0; j< endNode2.length; j++){
    var tagList2 = endNode2[j].getElementsByTagName(nodeTagName2);
  //  console.log(nodeTagName2);
    //console.log(tagList2.length);

    // find the parent element with the same innerHTML
    for (var i = 0; i < tagList2.length; i++) {
    //  console.log(tagList2[i].innerHTML);
    //  console.log(nodeHTML2);
        if (tagList2[i].innerHTML == nodeHTML2) {
          var foundEle2 = tagList2[i];
        }
      }

    // find the node within the element by comparing node data
    if(foundEle2 !== undefined ) {
      var nodeList2 = foundEle2.childNodes;
      for (var i = 0; i < nodeList2.length; i++) {
          if (nodeList2[i].data == nodeData2) {
              var foundNode2 = nodeList2[i];
          }
      }
      range.setEnd(foundNode2, endOffset);
      break;
    }
    if(foundNode2 === undefined) {
      if(range !== undefined) {
        range.setEnd(foundNode, endOffset);

      }
    }
  }
    return range;
}


//Higlightuje listu cvorova; prima informacije o cvorovima
function highlightList(listaKoordinata, listaTagName, listaInnerHtml ) {

  for(var i=0; i< listaKoordinata.length; i++) {
  //  console.log('HELOOO');
    var temp =  document.elementsFromPoint(listaKoordinata[i][0], listaKoordinata[i][1]);
      for(var j=0; j< temp.length; j++){
          //console.log('HELOOO2');
          var tagList = temp[j].getElementsByTagName(listaTagName[i]);
          for (var k = 0; k < tagList.length; k++) {
              //console.log(tagList[i].innerHTML);
              //console.log(nodeHTML);
              if (tagList[k].innerHTML == listaInnerHtml[i]) {
                var foundEle = tagList[k];
                foundEle.style.backgroundColor = "rgba(255,255,51,0.4)";
              }
            }
    }
  }
}

//daje rang za oznacavanje; tj oznaceni dio prvog i zadnjeg node-a
function getSafeRanges(dangerous) {
    var a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    var s = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a)
        for(var i = dangerous.startContainer; i != a; i = i.parentNode)
            s.push(i)
    ;
    if (0 < s.length) for(var i = 0; i < s.length; i++) {
        var xs = document.createRange();
        if (i) {
            xs.setStartAfter(s[i-1]);
            xs.setEndAfter(s[i].lastChild);
        }
        else {
            xs.setStart(s[i], dangerous.startOffset);
            xs.setEndAfter(
                (s[i].nodeType == Node.TEXT_NODE)
                ? s[i] : s[i].lastChild
            );
        }
        rs.push(xs);
    }

    // Ends -- basically the same code reversed
    var e = new Array(0), re = new Array(0);
    if (dangerous.endContainer != a)
        for(var i = dangerous.endContainer; i != a; i = i.parentNode)
            e.push(i)
    ;
    if (0 < e.length) for(var i = 0; i < e.length; i++) {
        var xe = document.createRange();
        if (i) {
            xe.setStartBefore(e[i].firstChild);
            xe.setEndBefore(e[i-1]);
        }
        else {
            xe.setStartBefore(
                (e[i].nodeType == Node.TEXT_NODE)
                ? e[i] : e[i].firstChild
            );
            xe.setEnd(e[i], dangerous.endOffset);
        }
        re.unshift(xe);
    }

    // Middle -- the uncaptured middle
    if ((0 < s.length) && (0 < e.length)) {
        var xm = document.createRange();
        xm.setStartAfter(s[s.length - 1 ]);
        xm.setEndBefore(e[e.length - 1]);
    }
    else {
        return [dangerous];
    }
    // Concat
    rs.push(xm);
    var response = rs.concat(re);

    // Send to Console
    return response;
}

//Highlight ranga
function highlightRange(range) {
    var newNode = document.createElement("div");
    newNode.setAttribute(
       "style",
       " background-color:rgba(255,255,51,0.4) ;display: inline;"
    );
    range.surroundContents(newNode);
}

// Lazy Range object detection.
function isRange(obj) {
  return ('type' in obj && obj.type === 'Range');
}

// Good-enough Range object comparison.
function rangeChange(data1, data2) {
  return (data1.type !== data2.type || data1.focusNode !== data2.focusNode || data1.focusOffset !== data2.focusOffset);
}


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            sesija : this.props.sesija,
            id : this.props.id,
            poruka : this.props.poruka
        }

        this.logout = this.logout.bind(this);
		 this.saveHiglight = this.saveHiglight.bind(this);
          this.returnHighlights = this.returnHighlights.bind(this);
            this.archiveText = this.archiveText.bind(this);
    }

    logout() {
        this.props.logout(this.state.sesija);
    }

	 setText() {
     sel = window.getSelection();
     citat = sel.toString();

   }

    setRang() {
     sel = window.getSelection();
     citat = sel.toString();
     range =  window.getSelection().getRangeAt(0);
      listacvorovastranice =  sel.getRangeAt(0).startContainer.parentNode.parentNode.childNodes;
      var startNode = range.startContainer.parentNode;
      var endNode = range.endContainer.parentNode;
      listaKoordinata = [];
      listaTagName = [];
      listaInnerHtml = [];
      listaData = [];



      listacvorovastranice.forEach(function(item){
          if ( sel.containsNode(item, true) && item !== startNode && item !== endNode ) {

              var top_temp = getOffset( item).top;
              var left_temp = getOffset( item ).left;
              listaKoordinata.push([left_temp, top_temp]);
              listaInnerHtml.push(item.innerHTML);
              listaTagName.push(item.tagName);
              listaData.push(item.data);
              //item.style.backgroundColor="rgba(255,255,51,0.4)";




          }
      });


    }



    saveHiglight(){
                  //  if(jeste){

            //console.log(range);
            var saveNode = range.startContainer;
            var startOffset_save = range.startOffset;  // where the range starts
            var endOffset_save = range.endOffset;      // where the range ends
            var nodeData_save = saveNode.data;
            var nodeHTML_save = saveNode.parentElement.innerHTML;
            var nodeTagName_save = saveNode.parentElement.tagName;   // parent element tag name
            var saveNode2 = range.endContainer;
            var nodeData_save2 = saveNode2.data;
            var nodeHTML_save2 = saveNode2.parentElement.innerHTML;
            var nodeTagName_save2 = saveNode2.parentElement.tagName;   // parent element tag name


          var stranica =  sel.getRangeAt(0).startContainer.parentNode.parentNode;
          //var listacvorovastranice =  sel.getRangeAt(0).startContainer.parentNode.parentNode.childNodes;
          var startNode = range.startContainer.parentNode;
          var endNode = range.endContainer.parentNode;

          var top1 = getOffset( startNode ).top;
          var left1 = getOffset( startNode ).left;
          var top2 = getOffset( endNode ).top;
          var left2 = getOffset( endNode ).left;





        axios.get('/currentDir', {
            /*responseType: 'blob',
            params : {
                'dir' : response.data.dir
            }*/
        })
        .then(response => {

          axios.get('/numberH', {}).then(resp=> {
            var id = resp.data.broj;

    //kooood

              //post request za insert u bazu
              axios.post('/saveHighlight', {
                'top' : top1,
                'left' : left1,
                'innerHtml' : nodeHTML_save,
                'data' : nodeData_save,
                'tagName' : nodeTagName_save,
                'isStart' : 1,
                'isEnd' : 0,
                'startOffset' : startOffset_save,
                'endOffset' : endOffset_save,
                'idH': id,
                'idDocument' : response.data.dir
              }).then(response => {}).catch(error => {
                  console.log(error.toString());
                  this.setState({error : error.toString()});
              });

              axios.post('/saveHighlight', {
                'top' : top2,
                'left' : left2,
                'innerHtml' : nodeHTML_save2,
                'data' : nodeData_save2,
                'tagName' : nodeTagName_save2,
                'isStart' : 0,
                'isEnd' : 1,
                'idH': id
              }).then(response => {}).catch(error => {
                console.log(error.toString());
                  this.setState({error : error.toString()});
              });

              //higlight unutrasnje cvorove
              NodeList.prototype.forEach = Array.prototype.forEach;
              listaKoordinata.forEach(function(item, index) {
                //post request za insert u bazu
                axios.post('/saveHighlight', {
                  'top' : item[0],
                  'left' : item[1],
                  'innerHtml' : listaInnerHtml[index],
                  'data' : listaData[index],
                  'tagName' : listaTagName[index],
                  'isStart' : 0,
                  'isEnd' : 0,
                  'idH' : id
                }).then(response => {}).catch(error => {
                    console.log(error.toString());
                    this.setState({error : error.toString()});
                });


              });
              highlightList(listaKoordinata,listaTagName,listaInnerHtml);
            //  listacvorovastranice.forEach(function(item){
                  //if ( sel.containsNode(item, true) && item !== startNode && item !== endNode ) {
                  /*if(range.isPointInRange(item,0) && item !== startNode && item !== endNode) {
                      var top_temp = getOffset( item).top;
                      var left_temp = getOffset( item ).left;
                      listaKoordinata.push([left_temp, top_temp]);
                      listaInnerHtml.push(item.innerHTML);
                      listaTagName.push(item.tagName);
                      listaData.push(item.data);
                      item.style.backgroundColor="rgba(255,255,51,0.4)";



                      //post request za insert u bazu
                      axios.post('/saveHighlight', {
                        'top' : top_temp,
                        'left' : left_temp,
                        'innerHtml' : item.innerHTML,
                        'data' : item.data,
                        'tagName' : item.tagName,
                        'isStart' : 0,
                        'isEnd' : 0,
                        'idH' : id
                      }).then(response => {}).catch(error => {
                          console.log(error.toString());
                          this.setState({error : error.toString()});
                      });



                  }*/
            //  });

            // Highlight vanjske cvorove
              var safeRanges = getSafeRanges(range);
              for (var i = 0; i < safeRanges.length; i++) {
                highlightRange(safeRanges[i]);
              }


              }).catch(error => {});

    //koOOOD

        })
        .catch(error => {
            this.setState({error : error.toString()});
        });





        //  startNode = range.startContainer;
          //endNode = range.endContainer;
          //jeste = 0;

      //  broj = broj +1;

        //  }
    }

    returnHighlights() {

      var Dir;
      axios.get('/currentDir', {

      }).then(response => {
        //console.log(response.data.dir);
        Dir = response.data.dir;


        axios.get('/returnHighlights', {
            /*responseType: 'json',*/
            params : {
                'dir' : Dir
            }
        }).then(response => {


            //ovdje parsiramo izvucene stvari iz baze

          //  var obj = JSON.parse(yourJsonString)
            console.log(response);
          var nizHighlight = response.data.nizHighlight;
            console.log(nizHighlight);
          for(var i =0; i< nizHighlight.length; i++) {
console.log('BROOOOOJ');
            var startOffset = nizHighlight[i].startOffset;
            var endOffset = nizHighlight[i].endOffset;
            var nizNode = nizHighlight[i].nizNode;
            console.log(nizNode);
            var jsonStart = nizNode.find(start);
            console.log(jsonStart);
            var jsonEnd = nizNode.find(end);
            var listaKoordinata2 = [];
            var listaTagName2 = [];
            var listaInnerHtml2 = [];


            for(var j = 0; j<nizNode.length; j++) {
              listaKoordinata2.push([nizNode[j].coordinateLeft, nizNode[j].coordinateTop]);
              listaTagName2.push(nizNode[j].tagName);
              listaInnerHtml2.push(nizNode[j].innerHtml);
            }
  console.log('WIIIIIIIIIIII');
  try{
           var rang = buildRange(jsonStart.coordinateLeft,jsonStart.coordinateTop, jsonEnd.coordinateLeft, jsonEnd.coordinateTop, startOffset,endOffset,jsonStart.data,jsonStart.innerHtml,jsonStart.tagName,jsonEnd.data,jsonEnd.innerHtml,jsonEnd.tagName);

var safeRanges = getSafeRanges(rang);
for (var f = 0; f < safeRanges.length; f++) {
    highlightRange(safeRanges[f]);
}
}
catch(err) {
  console.log('PROBLEM SA RANGOM');
}

highlightList(listaKoordinata2, listaTagName2, listaInnerHtml2);

          }



        }).catch(error => {
console.log('12341');
            this.setState({error : error.toString()});
        });

      }).catch(error => {

          this.setState({error : error.toString()});
      });

    }



    archiveText() {
      axios.post('/archiveText',{
        'citat' : citat,
        'id': this.state.id
      }).then(response => {}).catch(error => {
          console.log(error.toString());
          //this.setState({error : error.toString()});
      });
    }



    render() {
      const uploadFile = () => <UploadFile id={this.state.id} sesija={this.state.sesija}/>;    const helpPage = () => <HelpPage />;
        const pregledDokumenata = () => <PregledDokumenata id={this.state.id} sesija={this.state.sesija}/>;
        const pregledCitata = () => <PregledCitata id={this.state.id} sesija={this.state.sesija}/>


        return (
        <Router>
            {this.state.poruka != null ?
            <div>
                <p className="greska">{this.state.poruka}</p>
            </div> :
            <div>
            <div className="content">
                <div className="meni">
                    <i className="fa fa-user" style={{fontSize : '40px'}}> <span style={{fontSize : '20px', fontVariant : 'small-caps'}}> Account settings </span> </i>
                </div>
                <div className="navigation">
                        <div>
                        <Link to='/pregledDokumenata'>
                                <i className="fas fa-file" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Your files </span></i>
                            </Link>
                            <Link to='/uploadFile'>
                                <i className="fas fa-upload" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Upload file </span></i>
                            </Link>
							<Link to='/archiveQuotes'>
                                <i className="fas fa-upload" style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Favourite quote </span></i>
                            </Link>

                            <i className="fas fa-archive" onMouseOver = {this.setText} onClick = {this.archiveText} style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Archive text </span> </i>
                            <i className="fas fa-comment" onClick= {this.returnHighlights} style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Import highlights </span> </i>
                            <i className="fas fa-pencil-alt" onMouseOver = {this.setRang} onClick = {this.saveHiglight} style={{marginBottom: '15%'}}> <span style={{fontSize: '20px'}}> Highlight text </span></i>
                            <i className="fas fa-mobile-alt" style={{marginBottom: '15%'}}><span style={{fontSize: '20px', marginLeft : '20px'}}> Redirect </span></i>
                                     <Link to='/helpPage' >
                                <i className="fas fa-hire-a-helper" style={{marginBottom: '90%'}} > <span style={{fontSize: '20px'}}> HelpPage </span></i>
                            </Link>
                            <i className="fas fa-sign-out-alt" style={{marginBottom: '10%'}} onClick={this.logout}> <span style={{fontSize: '20px'}}> Log out </span></i>
                        </div>
                </div>
                <div className="mainContent">
                    <Redirect from='/' to='/pregledDokumenata' />
					<Route exact path="/pregledDokumenata" component={pregledDokumenata}/>
              <Route exact path='/uploadFile' component={uploadFile}></Route>
                    <Route exact path='/helpPage' component={helpPage}></Route>
                    <Route exact path='/archiveQuotes' component={pregledCitata}></Route>
                    </div>
            </div>
            </div> }
         </Router>
        )
    }
}

export default HomePage;
