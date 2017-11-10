$(function() {

    $.ajax({
        url: "/collaborators",
        type: 'get',
        dataType: 'json',
        beforeSend: function() {
            console.log("About to send");
        },
        success: function(data) {
            var viewsLabels = [], revenueLabels = [];
            var table = $('#tableContainer tbody');
            for (var i = 0; i < data.collaborators.length; i++) {

                table.append([
                    "<tr><td>" + data.collaborators[i].channel + "</td>",
                    "<td>" + data.collaborators[i].views + "</td>",
                    "<td>" + data.collaborators[i].revenue + "</td>",
                    "<td>" + data.collaborators[i].creation + "</td>",
                    "<td>" + data.collaborators[i].creation + "</td></tr>"
                ].join(''));

                viewsLabels.push({ label: data.collaborators[i].channel, value: data.collaborators[i].views });
                revenueLabels.push({ label: data.collaborators[i].channel, value: data.collaborators[i].revenue});
            }

            dchart('views', viewsLabels);
            dchart('revenue', revenueLabels);
        },
        error: function(err) {
            console.log(err);
        }
    })




    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    function dchart(id, labels) {
        var views = new d3pie(id, {
            header: {
                title: {
                    text: id.capitalize()
                },
                location: "pie-center"
            },
            size: {
                pieInnerRadius: "60%",
                canvasHeight: 400,
                canvasWidth: 400
            },
            labels: {
                mainLabel: {
                    fontSize: 10
                },
                outer: {
                    format: "none",
                }
            },
            data: {
                sortOrder: "label-asc",
                content: labels
            },
            tooltips: {
                enabled: true,
                type: "placeholder",
                string: "{label}: "+(id === 'revenue' ? '$' : '')+"{value}, {percentage}%"
            },
        });
    }
})
