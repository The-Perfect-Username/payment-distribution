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
            var summary = $('#summaryTable tbody');
            for (var i = 0; i < data.collaborators.length; i++) {

                summary.append([
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

    $.ajax({
        url: "/reports",
        type: 'get',
        dataType: 'json',
        beforeSend: function() {
            console.log("About to send");
        },
        success: function(data) {
            var report = $('#reportTable tbody');
            var pagination = $('.pagination');
            var hidden = '', count = 1;

            for (var i = 1; i <= Math.ceil(data.length / 2); i++) {
                pagination.append('<li><a href="#">'+i+'</a></li>');
            }

            for (var i = 0; i < data.length; i++) {

                if (i >= 2) {
                     hidden = "class='hidden'";
                }

                report.append([
                    "<tr "+hidden+" rel="+count+"><td>" + data[i].channel + "</td>",
                    "<td>" + data[i].views + "</td>",
                    "<td>" + data[i].revenue.toFixed(2) + "</td>",
                    "<td>" + data[i].creation + "</td></tr>",
                ].join(''));

                if (i % 2 !== 0) {
                    count++;
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    })

    $(document).on('click', '.pagination a',function(e) {
        e.preventDefault();
        var btn = $(this);
        var parent = btn.parents('.pagination');
        var target = parent.attr('target');
        var targetedTr = $(target).find('tbody tr[rel='+btn.text()+']');
        var tr = $(target).find('tbody tr');
        tr.addClass('hidden');
        targetedTr.removeClass('hidden');

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
