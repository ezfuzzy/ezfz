/**
 * graph logic
 */

function visualizeGraph(matrix, showWeight, showDirection) {
  const width = 800;
  const height = 600;
  document.getElementById("graph").innerHTML = ""; // clear previous graph

  //svg 초기화
  const svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const defs = svg.append("defs");

  if (showDirection) {
    // direction graph: 화살촉 초기화
    defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 28)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#555")
      .style("stroke", "none");
  }

  const nodes = matrix.map((_, i) => ({ id: i }));
  const links = [];

  matrix.forEach((row, i) => {
    row.forEach((value, j) => {
      if (value !== 0) {
        links.push({ source: i, target: j, weight: value }); // 간선
      }
    });
  });

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(150) //간선 길이
    )
    .force("charge", d3.forceManyBody().strength(-400)) // 동적으로 보이게
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(20));

  const link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", 2)
    .attr("stroke", "#555")
    .attr("marker-end", showDirection ? "url(#arrowhead)" : null); // check direction graph ? add arrowhead : null

  if (showWeight) {
    // weight graph
    const linkLabels = svg
      .append("g")
      .attr("class", "link-labels")
      .selectAll("text")
      .data(links)
      .enter()
      .append("text")
      .attr("class", "link-label")
      .text((d) => d.weight) // weight setting
      .attr("font-size", 14)
      .attr("fill", "#000")
      .attr("dy", -3);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      linkLabels // weight position
        .attr("x", (d) => (d.source.x + d.target.x) / 2)
        .attr("y", (d) => (d.source.y + d.target.y) / 2);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  } else {
    // no weight graph
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  }

  const node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter()
    .append("g");

  node
    .append("circle")
    .attr("r", 20)
    .attr("fill", "black")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);

  node
    .append("text")
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .text((d) => d.id + 1); // node numbering

  const drag = (simulation) => {
    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);
  };

  node.call(drag(simulation));
}
