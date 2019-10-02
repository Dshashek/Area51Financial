// With JQuery
//for sliders
$(document).ready(function() {
    $.ajax({
        url: '/age',
        type: 'POST',
        success: function(response) {
            var temp = JSON.parse(response);
            $('#age').append('<option></option>');
            $.each(temp, function(i, val) {
                $('#age').append('<option value=' + val + '>' + val + '</option>')

            });

        }
    })


    $('.js-example-basic-single').select2({
        placeholder: "Age",
        allowClear: true
    });

    $("#ex8").slider({

    });

    $("#ex9").slider({

    });

    $("#ex10").slider({

    });

    $("#ex11").slider({

    });



    //for filters
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });


    /***D3 Code */

    var margin = { top: 50, right: 0, bottom: 100, left: 30 },
        width = $('#charts').width() - margin.left - margin.right,
        height = 430 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 25),
        legendWidth = (gridSize / 2 + 4),
        dim_1 = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1"],
        dim_2 = ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "J2"],
        buckets = 10;
    mu = 10,
        sigma = 5,
        lambda = 0.1;

    var svg = d3.select("#heat").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("data1.tsv",

        function(d, i) {
            return {
                dim1: +d.dim1,
                dim2: +d.dim2,
                value: +Math.random() * 10
            };
        },

        function(error, data) {

            var maxNum = Math.round(d3.max(data, function(d) { return d.value; }));

            var colors = colorbrewer.RdYlGn[buckets];

            var colorScale = d3.scale.quantile()
                .domain([0, buckets - 1, maxNum])
                .range(colors);

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .style("visibility", "visible")
                .offset([-20, 0])
                .html(function(d) {
                    return "Value:  <span style='color:red'>" + Math.round(d.value);
                });

            tip(svg.append("g"));

            var dim1Labels = svg.selectAll(".dim1Label")
                .data(dim_1)
                .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", 0)
                .attr("y", function(d, i) { return i * gridSize; })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
                .attr("class", "mono");

            var dim2Labels = svg.selectAll(".dim2Label")
                .data(dim_2)
                .enter().append("text")
                .text(function(d) { return d; })
                .attr("x", function(d, i) { return i * gridSize; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("class", "mono");

            var heatMap = svg.selectAll(".dim2")
                .data(data)
                .enter().append("rect")
                .attr("x", function(d) { return (d.dim2 - 1) * gridSize; })
                .attr("y", function(d) { return (d.dim1 - 1) * gridSize; })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("class", "dim2 bordered")
                .attr("width", gridSize - 1)
                .attr("height", gridSize - 2)
                .style("fill", colors[0])
                .attr("class", "square")
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

            heatMap.transition()
                .style("fill", function(d) { return colorScale(d.value); });

            heatMap.append("title").text(function(d) { return d.value; });

            var legend = svg.selectAll(".legend")
                .data([0].concat(colorScale.quantiles()), function(d) { return d; })
                .enter().append("g")
                .attr("class", "legend");

            legend.append("rect")
                .attr("x", function(d, i) { return gridSize * 11; })
                .attr("y", function(d, i) { return (i * legendWidth + 7); })
                .attr("width", gridSize / 2)
                .attr("height", gridSize / 2)
                .style("fill", function(d, i) { return colors[i]; })
                .attr("class", "square");

            legend.append("text")
                .attr("class", "mono")
                .text(function(d) { return "≥ " + Math.round(d); })
                .attr("x", function(d, i) { return gridSize * 11 + 25; })
                .attr("y", function(d, i) { return (i * legendWidth + 20); })

            var title = svg.append("text")
                .attr("class", "mono")
                .attr("x", gridSize * 11)
                .attr("y", -6)
                .style("font-size", "14px")
                .text("Legend");

            // when user updates, change values
            d3.select("#Normal").on("click", function(d) { update(data, "norm"); });
            d3.select("#Logistic").on("click", function(d) { update(data, "logi"); });
            d3.select("#Exponential").on("click", function(d) { update(data, "expo"); });

            function update(data, dist) {

                d3.selectAll("class", "d3-tip").remove();

                newVal = new Array(100);

                for (var i = 0; i < 100; i++) {
                    if (dist == "norm") {
                        newVal[i] = box_muller(mu, sigma);
                    } else if (dist == "logi") {
                        newVal[i] = generate_logistic(mu, sigma);
                    } else if (dist == "expo") {
                        newVal[i] = generate_exp(lambda);
                    }
                }

                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .style("visibility", "visible")
                    .offset([-20, 0])
                    .html(function(d, i) {
                        return "Value:  <span style='color:red'>" + Math.round(newVal[i]);
                    });

                tip(svg.append("g"));

                var heatMap = svg.selectAll(".dim2")
                    .data(data)
                    .enter().append("rect")
                    .attr("x", function(d) { return (d.dim2 - 1) * gridSize; })
                    .attr("y", function(d) { return (d.dim1 - 1) * gridSize; })
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("class", "dim2 bordered")
                    .attr("width", gridSize - 2)
                    .attr("height", gridSize - 2)
                    .style("fill", colors[0])
                    .attr("class", "square")
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);

                heatMap.transition().style("fill", function(d, i) { return colorScale(newVal[i]); });

                heatMap.append("title").text(function(d) { return newVal[i]; });
            };

        }
    );



})