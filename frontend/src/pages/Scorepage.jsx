import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as d3 from "d3";

export const Scorepage = () => {
  const { state } = useLocation();

  useEffect(() => {
    console.log(state);

    let dataset1 = state.dataset;

    var svg = d3.select("svg"),
      margin = 200,
      width = svg.attr("width") - margin, //300
      height = svg.attr("height") - margin; //200

    var xScale = d3.scaleLinear().domain([0, 30]).range([0, width]),
      yScale = d3.scaleLinear().domain([0, 30]).range([height, 0]);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    // Title
    svg
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", 100)
      .attr("text-anchor", "middle")
      .style("font-family", "Helvetica")
      .style("font-size", 20)
      .text("Line Chart");

    // X label
    svg
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", height - 15 + 150)
      .attr("text-anchor", "middle")
      .style("font-family", "Helvetica")
      .style("font-size", 12)
      .text("Score");

    // Y label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(60," + height + ")rotate(-90)")
      .style("font-family", "Helvetica")
      .style("font-size", 12)
      .text("Attempt");

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    g.append("g").call(d3.axisLeft(yScale));

    svg
      .append("g")
      .selectAll("dot")
      .data(dataset1)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d[0]);
      })
      .attr("cy", function (d) {
        return yScale(d[1]);
      })
      .attr("r", 3)
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .style("fill", "#CC0000");

    var line = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[1]);
      })
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(dataset1)
      .attr("class", "line")
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#CC0000")
      .style("stroke-width", "2");
  }, []);

  return (
    <div className="font-mono flex  justify-center">
      <div className="font-mono flex flex-col">
      <div className="font-mono flex font-bold text-4xl text-orange-500">Score : {state.score}</div>
      <svg className="font-mono flex" width="800" height="550"></svg>
      <div className="font-mono flex font-bold text-2xl text-red-400">Thanks for giving test</div>
      <div className="font-mono flex font-bold text-2xl text-blue-800">
        <Link className="underline font-mono flex" to={"/"}>Click here & Go to homepage</Link>
      </div>
      </div>
    </div>
  );
};
