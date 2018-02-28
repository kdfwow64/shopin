import * as React from "react";

declare var d3: any;

export interface DonutChartProps {
    height?: number;
    data?: any;
    active?: boolean;
}

export interface DonutChartState {
}

const INITIAL_PROPS: DonutChartProps = {
    active: true
};

const INITIAL_STATE: DonutChartState = {
};


const pieChart: any = (options: any) => {

    let firstAnimationDuration = 1500;
    let animationPasses = 0;
    let animationDuration = 1000;
    let color = (d3.schemeCategory10);
    let data: any = [];
    let innerRadius = 0;
    let outerRadius = 100;
    let legends = 0;
    let lastData: any = null;
    let arc = d3.arc();
    let pie = d3.pie()
        .sort(null)
        .value(function (d: any) {
          return d.value;
        });

      var radius = outerRadius;

    function updateTween (d: any) {
      const i = d3.interpolate(this._current, d);
      this._current = i(0);

      return function(t: any) {
        return arc(i(t));
      };
    }

    function exitTween (d: any) {
      let end = Object.assign({}, this._current, { startAngle: this._current.endAngle });
      let i = d3.interpolate(d, end);

      return function(t: any) {
        return arc(i(t));
      };
    }

    function joinKey (d: any) {
      return d.data.color;
    }

    function midAngle(d){
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    function wrap(text, width) {
      text.each(function( d ) {
        width = d.data.width || width;

        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 16, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy") || 0),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "px");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            console.log(lineNumber, lineHeight,  dy)
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "px").text(word);
          }
        }
      });
    }
  
    const pieChart: any = function (context: any) {
      let d = pie(data);
      let slices = context.selectAll('.slice').data(pie(data), joinKey);
      let oldSlices = slices.exit();
      let newSlices = slices.enter().append('path')
        .each(function(d: any) { this._current = Object.assign({}, d, { startAngle: d.endAngle }); })
        .attr('class', 'slice')
        .style('fill', ( d: any ) => d.data.color);
        const labelArc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const legend = context.selectAll(`.legend-${legends}`).data(lastData || d, joinKey);
        const oldLegend = legend;
        const paths = context.selectAll(`.paths__${legends}`);
        const paths2 = context.selectAll(`.paths-2__${legends}`).data(lastData || d, joinKey);
        const oldPaths = paths;
        const oldPaths2 = paths2;
        const oldCircles = context.selectAll(`.circles-${legends}`).data(lastData || d, joinKey);
   
        legends++;

        var newLegend = context.selectAll(`.legend-${legends}`).data(d, joinKey).enter().append("g")
         .filter(( d: any ) => d.data.value > 0)
         .attr("class", `legend-${legends}`)
         .attr("x", (d: any, i: any) => {
          const c = labelArc.centroid(d, i);
          const di = 1.25;
          let x = c[0] * di;
          let y = c[1] * di;

          c[0] < 0 ? x += 75 : x -= 75;
    
          return x;
         })
         .attr("y", (d: any, i: any) => {
          const c = labelArc.centroid(d, i);
          const di = 1.25;
          let x = c[0] * di;
          let y = c[1] * di;

          c[0] < 0 ? x += 75 : x -= 75;
    
          return y;
         })
         .style("width", 20)
         .style("height", 20);

        const legendDelay = animationPasses < 2 ? 500 : 800;

        newLegend.append("text").style("font-size", "14px")
         .style("font-weight", "bold")
         .attr("text-anchor", ( d: any, i: any ) => {
          const c = labelArc.centroid(d, i);
    
          return c[0] < 0 ? "end" : "start";
         })
         .text(( d: any) => `${d.data.series}`);

        newLegend.selectAll("text").call(wrap, 165);

        newLegend.append("text").style("font-size", "14px")
         .attr("text-anchor", ( d: any, i: any ) => {
          const c = labelArc.centroid(d, i);

          return c[0] < 0 ? "end" : "start";
         })
         .attr("y", 22)
         .text(( d: any ) => d.data.lineOne);

         newLegend.append("text").style("font-size", "14px")
          .filter(( d: any ) => d.data.lineTwo)
          .attr("text-anchor", ( d: any, i: any ) => {
            const c = labelArc.centroid(d, i);

            return c[0] < 0 ? "end" : "start";
          })
          .attr("y", 38)
          .text(( d: any) => d.data.lineTwo);

        const circles = context.selectAll(`.circles-${legends}`).data(d, joinKey).enter().append("g")
          .filter(( d: any ) => d.data.value > 0)
          .attr("class", `circles-${legends}`)
          .append("circle")
          .style("opacity", "0")
          .style("fill", ( d: any ) => d.data.color)
          .attr("transform", (d: any, i: any) => {
            const c = labelArc.centroid(d, i);
            const di = 1.15;
            let x = c[0] * di;
            let y = c[1] * di;

            c[0] < 0 ? x -= 75 : x += 75;

            return `translate(${x}, ${y})`;
           })


          circles.transition()
          .style("opacity", "0")
          .duration(100)
          .delay(legendDelay)
          .attr("cy", -5)
          .attr("r", 5)
          .attr("cx", ( d: any, i: any ) => {
            const c = labelArc.centroid(d, i);

            return c[0] < 0 ? 10 : -10;
          })
          .style("opacity", "0.4")
          .attrTween("transform", function ( d: any, i: any ) {
            this._current = this._current || d;
            const c = labelArc.centroid(d, i);
            const di = 1.15;
            let x = c[0] * di;
            let y = c[1] * di;
            const offset = c[0] < 0 ? -10 : 10;
            const interpolateX = d3.interpolate(x + offset, c[0] * 1.25 + offset);
            const interpolateY = d3.interpolate(y, c[1] * 1.25);

            return function ( t: any ) {
              let x2 = interpolateX(t);
              let y2 = interpolateY(t);

              return `translate(${x2}, ${y2})`;
            }
          })
          .transition()
          .duration(1000)
          .style("opacity", "1")
          .attrTween("transform", function ( d: any, i: any ) {
            this._current = this._current || d;
            const c = labelArc.centroid(d, i);
            const di = 1.25;
            let x = c[0] * di;
            let y = c[1] * di;
            const offset = c[0] < 0 ? -75 : 75;
            const initialOffset = c[0] < 0 ? -10 : 10;
            const interpolateX = d3.interpolate(x + initialOffset, x + offset);

            return function ( t: any ) {
              let x2 = interpolateX(t);

              return `translate(${x2}, ${y})`;
            }
          })




        const newPaths = context.selectAll(`.paths__${legends}`).data(d, joinKey).enter().append("g")
          .filter(( d: any ) => d.data.value > 0)
          .attr("class", `paths__${legends} path__gradient`)
          .append("line")
           .style("stroke", ( d: any ) => d.data.color)
           .style("opacity", "0")
           .attr("x1", ( d: any, i: any ) => labelArc.centroid(d, i)[0] * 1.15)
           .attr("y1", ( d: any, i: any ) => labelArc.centroid(d, i)[1] * 1.15)
           .attr("x2", ( d: any, i: any ) => labelArc.centroid(d, i)[0] * 1.15)
           .attr("y2", ( d: any, i: any ) => labelArc.centroid(d, i)[1] * 1.15)
          .transition()
          .delay(legendDelay)
          .duration(100)
          .style("opacity", "0.4")
          .attr("x2", ( d: any, i: any ) => {
            const c = labelArc.centroid(d, i);
            const di = 1.25;
            let x = c[0] * di;
            let y = c[1] * di;

            return x;
           })
           .attr("y2", ( d: any, i: any ) => {
            const c = labelArc.centroid(d, i);
            const di = 1.25;
            let x = c[0] * di;
            let y = c[1] * di - 5;

            return y;
           })
           .transition()
            .duration(1000)
            .style("opacity", "1")

          const newPaths2 = context.selectAll(`.paths-2__${legends}`).data(d, joinKey).enter().append("g")
           .filter(( d: any ) => d.data.value > 0)
           .attr("class", `paths-2__${legends}`)
           .append("line")
           .style("stroke", ( d: any ) => d.data.color)
           .attr("x1", ( d: any, i: any ) => labelArc.centroid(d, i)[0] * 1.25)
           .attr("y1", ( d: any, i: any ) => labelArc.centroid(d, i)[1] * 1.25 - 5)
           .attr("x2", ( d: any, i: any ) => labelArc.centroid(d, i)[0] * 1.25)
           .attr("y2", ( d: any, i: any ) => labelArc.centroid(d, i)[1] * 1.25 - 5)
           .style("opacity", "0.4")
           .transition()
           .delay(legendDelay + 200)
           .duration(1000)
           .style("opacity", "1")
           .attr("x2", ( d: any, i: any ) => {
            const c = labelArc.centroid(d, i);
            const di = 1.25;
            let x = c[0] * di;
            let y = c[1] * di - 5;

            c[0] < 0 ? x -= 70 : x += 70;

            return x;
           });


      const circle = context.selectAll('.chart-border');

      if ( !circle.size() ) {
        context.insert("circle", ":first-child")
            .attr("class", "chart-center")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", innerRadius - 3)
            .attr("fill", "#fff");

        context.insert("circle", ":first-child")
            .attr("class", "chart-border")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", outerRadius)
            .attr("fill", "#eeeeee");
      }

      let t = d3.transition().duration(animationPasses < 2 ? firstAnimationDuration : animationDuration);

      animationPasses++;

      arc.innerRadius(innerRadius).outerRadius(outerRadius).cornerRadius(80);

      const hideLegend = legend => legend.style("opacity", 1)
        .transition(d3.transition().duration(500))
        .style("opacity", 0)
        .attrTween("transform", function ( d: any, i: any ) {
          this._current = this._current || d;
          const c = labelArc.centroid(d, i);
          const di = 1.25;
          let x = c[0] * di;
          let y = c[1] * di;
          const interpolate = d3.interpolate(y, y + 30);

          c[0] < 0 ? x -= 75 : x += 75;

          return function ( t: any ) {
            let y2 = interpolate(t);

            return `translate(${x}, ${y2})`;
          }
        })
        .remove();

      hideLegend(oldLegend)

      const hidePaths = paths => paths
      .style("opacity", 1)
      .transition(d3.transition().duration(500))
      .style("opacity", 0)
      .attrTween("transform", function ( d: any, i: any ) {
        const interpolate = d3.interpolate(0, 30);

        return function ( t: any ) {
          let y2 = interpolate(t);

          return `translate(0, ${y2})`;
        }
      })
      .remove();


      hidePaths(oldPaths);
      hidePaths(oldPaths2);

      oldCircles
        .remove();


      newLegend
      .style("opacity", 0)
      .transition()
      .duration(1200)
      .delay(legendDelay + 100)
      .style("opacity", 1)
      .attrTween("transform", function ( d: any, i: any ) {
        this._current = this._current || d;
        const c = labelArc.centroid(d, i);
        const di = 1.25;
        let x = c[0] * di;
        let y = c[1] * di;
        const interpolate = d3.interpolate(y - 30, y);

        c[0] < 0 ? x -= 75 : x += 75;

        return function ( t: any ) {
          let y2 = interpolate(t);

          return `translate(${x}, ${y2})`;
        }
      });

      oldSlices.remove();

      slices
      .transition(t)
        .attrTween('d', updateTween);

      newSlices
        .transition(t)
          .attrTween('d', updateTween);

      lastData = d;
    }

    pieChart.data = function (_: any) {
      return arguments.length ? (data = _, pieChart) : data;
    };


    pieChart.innerRadius = function (_: any) {
      return arguments.length ? (innerRadius = _, pieChart) : innerRadius;
    };

    pieChart.outerRadius = function (_: any) {
      return arguments.length ? (outerRadius = _, pieChart) : outerRadius;
    };

    return pieChart;
  }

export class DonutChart extends React.Component<DonutChartProps, DonutChartState>
{
 public static defaultProps = INITIAL_PROPS;

 private _svg: any;
 private _chart: any;
 private _chartEl: any;

 constructor ( props: DonutChartProps )
 {
  super(props);

  this.state = INITIAL_STATE;
 }

 public componentDidMount ()
 {
  if ( !this._svg ) return;

  this.prepare();
  this.draw();
 }

 public componentWillReceiveProps ( newProps: DonutChartProps )
 {
     let shouldDraw = false;

     if ( newProps.data && newProps.data != this.props.data ) {
       shouldDraw = true;
     } else if ( !this.props.active && newProps.data && newProps.active ) {
         shouldDraw = true;
     }

    if ( shouldDraw ) this.draw(newProps);
 }

 protected prepare ()
 {
    let width = this._svg.parentNode.offsetWidth;
    const height = this.props.height || width;

    width = width > 1440 ? 1440 : width;

    const svg = d3.select(".donut-chart")
        .attr("width", width)
        .attr("height", height);

    this._chart = pieChart().outerRadius(220).innerRadius(192);
    this._chartEl = svg.append('g')
        .attr('class', 'pie-chart')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const gradient = svg.append("defs")
        .append("linearGradient")
          .attr("id", "linearGradient")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "100%")
          .attr("spreadMethod", "pad");

          gradient.append('stop')
                .attr('class', 'stop-left')
                .attr('offset', '0');

                gradient.append('stop')
                .attr('class', 'stop-right')
                .attr('offset', '1');
 }

 protected draw ( props: DonutChartProps = this.props )
 {
    if ( !props.active ) return;

    this._chartEl.call(this._chart.data(props.data));
 }

 public render ()
 {
  return (
   <div className="donut">
    <svg className="donut-chart" ref={(svg => {
      if ( !svg || this._svg ) return;

      this._svg = svg;
    })} />
    <div className="donut__hole horizontal center layout">
      <div className="fit-height horizontal justified center layout flex">
        <div className="donut__hole--bar vertical justified layout">
          <div className="donut__hole--circle" />
          <div className="donut__hole--circle" />
        </div>
        <div className="donut__hole--bar fit-height vertical justified layout">
          <div className="donut__hole--circle" />
          <div className="donut__hole--circle" />
        </div>
        <div className="donut__hole--bar vertical justified layout">
          <div className="donut__hole--circle" />
          <div className="donut__hole--circle" />
        </div>
      </div>
    </div>
   </div>

  )
 }
}
