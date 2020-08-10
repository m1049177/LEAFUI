<template>
  <div >
      <h2> 
        <font-awesome-icon style='height:25px;width:20px;margin-left:3px;' icon="pencil-alt" /> 
          Draw Tool
      </h2>
    <b-row>
    <b-col cols=8 style="display: flex; justify-content: space-between">
      <div
        id="myPaletteDiv"
        style="width: 105px;height: 620px; margin-right: 2px; background-color: whitesmoke;z-index:0; border: solid 1px black"
      ></div>
     
      <div
        id="myDiagramDiv"
        style="flex-grow: 1; height: 620px; border: solid 1px black;background-color: #DAE4E4;z-index:0;">
      </div>
       
    </b-col>
   
    <b-col style='max-height:620px; overflow-y: scroll;' cols=4>
      <b-row>
          <div class="form-group">
            <label class="form-control-label" for="diagram-category">Category</label>
                <select class="form-control" name="category" v-model="category" id="diagram-category" >
                    <option value="" disabled selected hidden>Select diagram category to save</option>
                    <option value="APPPORTFOLIO" >APPPORTFOLIO</option>
                    <option value="TECHNICALVIEW" >TECHNICALVIEW</option>
                    <option value="FUNCTIONALVIEW" >FUNCTIONALVIEW</option>
                  </select>
                    </div>
        <button :disabled="category === ''" class="btn saveBtn btn-primary" id="blobButton" @click="makeBlob()">Save Image for review</button>
      </b-row>
      <draw/>
    </b-col>
    </b-row>

    <!-- <div>
      <div>
        <button id="SaveButton" onclick="save()">Save</button>
        <button onclick="load()">Load</button>
        Diagram Model saved in JSON format:
      </div>
      <textarea id="mySavedModel" style="width:100%;height:300px">
{ "class": "go.GraphLinksModel",
  "linkFromPortIdProperty": "fromPort",
  "linkToPortIdProperty": "toPort",
  "nodeDataArray": [
 ],
  "linkDataArray": [
 ]}
    </textarea>
    </div>-->
  </div>
</template>


<script>
import go from "gojs";
import { bus } from '../../../main';
import axios from 'axios';
import { mixins } from 'vue-class-component';
import JhiDataUtils from '../../shared/data/data-utils.service';
import { companyService } from '../../entities/company/company.service.ts';
import drawComponent from './draw.vue';

const $ = go.GraphObject.make;
let myDiagram;
// This works because we have overridden the /extensionsTS/tsconfig.json file
// in the options to the loader: 'ts-loader', in the webpack.config.js
// import { GuidedDraggingTool } from "gojs/extensionsTS/GuidedDraggingTool.ts";
// import "../../node_modules/gojs/extensions/Figures.js";
// import "../../node_modules/gojs/assets/js/goSamples.js"
export default {
  name: "drawtoolGoJs",
  inject : { 
    companyService : 'companyService',
    diagramService : 'diagramService',
    filterService : 'filterService' 
  },
  components : {
    draw : drawComponent,
  },
  data: function() {
    return  {
      imageLoad : false,
      company_id: 0,
      dismissCountDown: 0,
      diagramData: [],
      category : '',
      pictureData : {
        category : '',
        picture : {},
        pictureContentType : '',
        company : {},
      },
      blob : {},
      blobList : [],
      collapseClass : {
        height : '450px'
      }
    }
    
  },
  created : function() {
      bus.$on('CompanyChange', function(obj) {
        this.company_id = obj;
      });
      if(this.company_id === 0) {
        this.company_id = parseInt(localStorage.getItem('CompanyId'));
      }
  },
  methods: {
    save :function() {
      console.log("save");
      const imgBlob = myDiagram.makeImageData({
        background: "black",
      });
      console.log(imgBlob);
    },
    makeBlob :function() {
       this.blob = myDiagram.makeImageData({
        background: "white",
        type: "blob"
      });
      this.imageLoad = true;
      const categoryForDiagram = this.category;
      console.log(this.category);
       this.companyService().findby(this.company_id,this.blob,this.category).then(function(res) {
         
       }).catch(function(error) { console.log(error); })
      this.category = '';
      myDiagram.clear();

    },
  },
  mounted: function() {
   myDiagram = $(
     go.Diagram,
      "myDiagramDiv", // must name or refer to the DIV HTML element
      {
        // grid: $(
        //   go.Panel,
        //   "Grid",
        //   $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
        //   $(go.Shape, "LineH", {
        //     stroke: "gray",
        //     strokeWidth: 0.5,
        //     interval: 10
        //   }),
        //   $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
        //   $(go.Shape, "LineV", {
        //     stroke: "gray",
        //     strokeWidth: 0.5,
        //     interval: 10
        //   })
        // ),
        //  draggingTool: new GuidedDraggingTool(),
        "draggingTool.dragsLink": true,
        "draggingTool.isGridSnapEnabled": true,
        "linkingTool.isUnconnectedLinkValid": true,
        "linkingTool.portGravity": 20,
        "relinkingTool.isUnconnectedLinkValid": true,
        "relinkingTool.portGravity": 20,
        "relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
          segmentIndex: 0,
          cursor: "pointer",
          desiredSize: new go.Size(8, 8),
          fill: "tomato",
          stroke: "darkred"
        }),
        "relinkingTool.toHandleArchetype": $(go.Shape, "Diamond", {
          segmentIndex: -1,
          cursor: "pointer",
          desiredSize: new go.Size(8, 8),
          fill: "darkred",
          stroke: "tomato"
        }),
        "linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
          desiredSize: new go.Size(7, 7),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
        "rotatingTool.handleAngle": 270,
        "rotatingTool.handleDistance": 30,
        "rotatingTool.snapAngleMultiple": 15,
        "rotatingTool.snapAngleEpsilon": 15,
        "undoManager.isEnabled": true
      }
    );

    myDiagram.addDiagramListener("Modified", function(e) {
      const button = document.getElementById("SaveButton");
      if (button) {
        button.disabled = !myDiagram.isModified;
      } 
      const idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) {
          document.title += "*";
        }
      } else {
        if (idx >= 0) {
          document.title = document.title.substr(0, idx);
        }
      }
    });
    const nodeSelectionAdornmentTemplate = $(
      go.Adornment,
      "Auto",
      $(go.Shape, {
        fill: null,
        stroke: "deepskyblue",
        strokeWidth: 1.5,
        strokeDashArray: [4, 2]
      }),
      $(go.Placeholder)
    );

    const nodeResizeAdornmentTemplate = $(
      go.Adornment,
      "Spot",
      { locationSpot: go.Spot.Right },
      $(go.Placeholder),
      $(go.Shape, {
        alignment: go.Spot.TopLeft,
        cursor: "nw-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      $(go.Shape, {
        alignment: go.Spot.Top,
        cursor: "n-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      $(go.Shape, {
        alignment: go.Spot.TopRight,
        cursor: "ne-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      $(go.Shape, {
        alignment: go.Spot.Left,
        cursor: "w-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      $(go.Shape, {
        alignment: go.Spot.Right,
        cursor: "e-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      $(go.Shape, {
        alignment: go.Spot.BottomLeft,
        cursor: "se-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      $(go.Shape, {
        alignment: go.Spot.Bottom,
        cursor: "s-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      $(go.Shape, {
        alignment: go.Spot.BottomRight,
        cursor: "sw-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue"
      })
    );
    const nodeRotateAdornmentTemplate = $(
      go.Adornment,
      { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
      $(go.Shape, "Circle", {
        name: "CIRCLE",
        cursor: "pointer",
        desiredSize: new go.Size(7, 7),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      $(go.Shape, {
        geometryString: "M3.5 7 L3.5 30",
        isGeometryPositioned: true,
        stroke: "deepskyblue",
        strokeWidth: 1.5,
        strokeDashArray: [4, 2]
      })
    );
    myDiagram.nodeTemplate = $(
      go.Node,
      "Spot",
      { locationSpot: go.Spot.Center },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        selectable: true,
        selectionAdornmentTemplate: nodeSelectionAdornmentTemplate
      },
      {
        resizable: true,
        resizeObjectName: "PANEL",
        resizeAdornmentTemplate: nodeResizeAdornmentTemplate
      },
      { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
      new go.Binding("angle").makeTwoWay(),
      // the main object is a Panel that surrounds a TextBlock with a Shape
      $(
        go.Panel,
        "Auto",
        { name: "PANEL" },
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
          go.Size.stringify
        ),
        $(
          go.Shape,
          "Rectangle", // default figure
          {
            portId: "", // the default port: if no spot on link data, use closest side
            fromLinkable: true,
            toLinkable: true,
            cursor: "pointer",
            fill: "white", // default color
            strokeWidth: 2
          },
          new go.Binding("figure"),
          new go.Binding("fill")
        ),
        $(
          go.TextBlock,
          {
            font: "bold 11pt Helvetica, Arial, sans-serif",
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay()
        )
      )
      // four small named ports, one on each side:
      // this.makePort("T", go.Spot.Top, false, true),
      // this.makePort("L", go.Spot.Left, true, true),
      // this.makePort("R", go.Spot.Right, true, true),
      // this.makePort("B", go.Spot.Bottom, true, false),
      // {
      //   // handle mouse enter/leave events to show/hide the ports
      //   mouseEnter: function(e, node) {
      //     showSmallPorts(node, true);
      //   },
      //   mouseLeave: function(e, node) {
      //     showSmallPorts(node, false);
      //   }
      // }
    );
    const linkSelectionAdornmentTemplate = $(
      go.Adornment,
      "Link",
      $(
        go.Shape,
        // isPanelMain declares that this Shape shares the Link.geometry
        { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }
      ) // use selection object's strokeWidth
    );
    myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        selectable: true,
        selectionAdornmentTemplate: linkSelectionAdornmentTemplate
      },
      { relinkableFrom: true, relinkableTo: true, reshapable: true },
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4
      },
      new go.Binding("points").makeTwoWay(),
      $(
        go.Shape, // the link path shape
        { isPanelMain: true, strokeWidth: 2 }
      ),
      $(
        go.Shape, // the arrowhead
        { toArrow: "Standard", stroke: null }
      ),
      $(
        go.Panel,
        "Auto",
        new go.Binding("visible", "isSelected").ofObject(),
        $(
          go.Shape,
          "RoundedRectangle", // the link shape
          { fill: "#F8F8F8", stroke: null }
        ),
        $(
          go.TextBlock,
          {
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#919191",
            margin: 2,
            minSize: new go.Size(10, NaN),
            editable: true
          },
          new go.Binding("text").makeTwoWay()
        )
      )
    );

    const myPalette = $(
      go.Palette,
      "myPaletteDiv", // must name or refer to the DIV HTML element
      {
        maxSelectionCount: 1,
        nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
        // simplify the link template, just in this Palette
        linkTemplate: $(
          go.Link,
          {
            // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
            // to line up the Link in the same manner we have to pretend the Link has the same location spot
            locationSpot: go.Spot.Center,
            selectionAdornmentTemplate: $(
              go.Adornment,
              "Link",
              { locationSpot: go.Spot.Center },
              $(go.Shape, {
                isPanelMain: true,
                fill: null,
                stroke: "deepskyblue",
                strokeWidth: 0
              }),
              $(
                go.Shape, // the arrowhead
                { toArrow: "Standard", stroke: null }
              )
            )
          },
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4
          },
          new go.Binding("points"),
          $(
            go.Shape, // the link path shape
            { isPanelMain: true, strokeWidth: 2 }
          ),
          $(
            go.Shape, // the arrowhead
            { toArrow: "Standard", stroke: null }
          )
        ),
        model: new go.GraphLinksModel(
          [
            // specify the contents of the Palette
            { text: "", figure: "Circle", fill: "#FFFFFF" },
            { text: "" },
            { text: "", figure: "Ellipse", fill: "#FFFFFF" },
            { text: "", figure: "Diamond", fill: "#FFFFFF" },
            { text: "", figure: "TriangleRight", fill: "#FFFFFF" },
            { text: "", figure: "RoundedRectangle", fill: "#FFFFFF" }
          ],
          [
            // the Palette also has a disconnected Link, which the user can drag-and-drop
            {
              points: new go.List(/*go.Point*/).addAll([
                new go.Point(0, 0),
                new go.Point(30, 0),
                new go.Point(30, 40),
                new go.Point(60, 40)
              ])
            }
          ]
        )
      }
    );

    // document.getElementById("blobButton").addEventListener("click", makeBlob);
  }
  // makePort(name, spot, output, input) {
  //   // the port is basically just a small transparent square
  //   return $(go.Shape, "Circle", {
  //     fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
  //     stroke: null,
  //     desiredSize: new go.Size(7, 7),
  //     alignment: spot, // align the port on the main Shape
  //     alignmentFocus: spot, // just inside the Shape
  //     portId: name, // declare this object to be a "port"
  //     fromSpot: spot,
  //     toSpot: spot, // declare where links may connect at this port
  //     fromLinkable: output,
  //     toLinkable: input, // declare whether the user may draw links to/from here
  //     cursor: "pointer" // show a different cursor to indicate potential link point
  //   });
  // },
  // showSmallPorts(node, show) {
  //   node.ports.each(function(port) {
  //     if (port.portId !== "") {
  //       // don't change the default port, which is the big shape
  //       port.fill = show ? "rgba(0,0,0,.3)" : null;
  //     }
  //   });
  // }
};
</script>
<style scoped>
.previewDiv{
background-color: whitesmoke;
}
.previewImage {
  height: 300px;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: 3px 3px 3px 3px #888888;
    width: 100%;
}
.saveBtn {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    margin: 10px;
    height: 80%;
    margin: auto;
    border-radius: 16px;
}
h2{
    font-weight: 600;
    font-style: normal;
    word-spacing: normal;
    font-size: x-large;
    color: darkblue;
}
</style>