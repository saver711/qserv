"use strict"
$(function () {
  /* start global */
  const root = document.querySelector(":root")
  const petrol95Color = getComputedStyle(root).getPropertyValue("--petrol95")
  const slight95Color = getComputedStyle(root).getPropertyValue("--slight95")
  const petrol91Color = getComputedStyle(root).getPropertyValue("--petrol91")
  const slight91Color = getComputedStyle(root).getPropertyValue("--slight91")
  const dieselColor = getComputedStyle(root).getPropertyValue("--diesel")
  const slightDieselColor =
    getComputedStyle(root).getPropertyValue("--slightDiesel")
  const primaryColor = getComputedStyle(root).getPropertyValue("--primary")
  const darkColor = getComputedStyle(root).getPropertyValue("--dark")

  /* dummy data will be changed */
  const capacity95 = 100000
  const capacity91 = 100000
  const capacityDiesel = 100000
  const totalCapacity = capacity95 + capacity91 + capacityDiesel

  const sold95 = 62000
  const sold91 = 32000
  const soldDiesel = 68000
  const totalSold = sold95 + sold91 + soldDiesel

  const sold95Per = (sold95 / capacity95) * 100
  const sold91Per = (sold91 / capacity91) * 100
  const soldDieselPer = (soldDiesel / capacityDiesel) * 100
  const totalSoldPer = (totalSold / totalCapacity) * 100

  /* end global */

  /* start overviewChart */
  const overviewChart = document
    .getElementById("overviewChart")
    .getContext("2d")

  let delayed

  /* get last 10 hours */
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() - h)
    return this
  }
  const overviewLabels = []
  for (let i = 0; i < 10; i++) {
    const date =
      "0" +
      new Date().addHours(i).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      })
    overviewLabels.push(date.slice(-5))
  }

  // just DUMMY DATA (will be replaced from Api)
  const overviewData = {
    petrol95: [
      50000, 48000, 90000, 80000, 86000, 90000, 20000, 30000, 48000, 40000,
    ],
    petrol91: [
      30000, 59000, 80000, 81000, 56000, 55000, 50000, 78000, 28000, 90000,
    ],
    diesel: [
      80000, 49000, 80000, 31000, 96000, 65000, 10000, 88000, 38000, 70000,
    ],
  }

  const overviewFunction = (insertedData) => {
    const overviewData = {
      labels: overviewLabels,
      datasets: [
        {
          label: "Gasoline 95",
          data: insertedData.petrol95,
          pointBackgroundColor: petrol95Color,
          borderColor: petrol95Color,
          radius: 0,
          hitRadius: 17,
        },
        {
          label: "Gasoline 91",
          data: insertedData.petrol91,
          pointBackgroundColor: petrol91Color,
          borderColor: petrol91Color,
          radius: 0,
          hitRadius: 17,
        },
        {
          label: "Diesel",
          data: insertedData.diesel,
          pointBackgroundColor: dieselColor,
          borderColor: dieselColor,
          radius: 0,
          hitRadius: 17,
        },
      ],
    }

    const tooltipLine = {
      id: "tooltipLine",
      beforeDraw: (chart) => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const ctx = chart.ctx
          ctx.save()
          const activePoint = chart.tooltip._active[0]

          ctx.beginPath()
          ctx.setLineDash([5, 7])
          ctx.moveTo(activePoint.element.x, activePoint.element.y)
          ctx.lineTo(activePoint.element.x, chart.chartArea.bottom)
          ctx.lineWidth = 2
          ctx.strokeStyle = primaryColor
          ctx.stroke()
          ctx.restore()
        }
      },
    }

    const overviewConfig = {
      type: "line",
      data: overviewData,
      plugins: [tooltipLine],
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            yAlign: "bottom",
            backgroundColor: darkColor,
            titleColor: "#333",
            bodyColor: "#333",
            cornerRadius: 10,
          },
        },
        animations: {
          tension: {
            delay: 1350,
            duration: 300,
            easing: "linear",
            from: 0,
            to: 0.4,
          },
        },
        animation: {
          onComplete: () => {
            delayed = true
          },
          delay: (context) => {
            let delay = 0
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 100 + context.datasetIndex * 1
            }
            return delay
          },
        },
        responsive: true,
        scales: {
          x: {
            grid: {
              // display: false,
              borderDash: [2],
            },
          },
          y: {
            grid: {
              // display: false,
              borderDash: [5],
            },
            ticks: {
              callback: function (value) {
                if (value >= 1000) return value / 1000 + " kL"
                return value + "L"
              },
            },
          },
        },
      },
    }

    return new Chart(overviewChart, overviewConfig)
  }

  overviewFunction(overviewData)

  /* end overviewChart */

  /* start gauges */
  const benzin95Gauge = (soldValueInPercentage) => {
    const cnt = document.getElementById("Count95")
    const water = document.getElementById("Water95")
    let percent = cnt.innerText
    let interval
    interval = setInterval(function () {
      percent++
      cnt.innerHTML = percent
      water.style.transform = "translate(0" + "," + (100 - percent) + "%)"
      if (percent === Math.round(soldValueInPercentage)) {
        clearInterval(interval)
      }
    }, 20)
  }

  benzin95Gauge(sold95Per)

  const benzin91Gauge = (soldValueInPercentage) => {
    const cnt = document.getElementById("Count91")
    const water = document.getElementById("Water91")
    let percent = cnt.innerText
    let interval
    interval = setInterval(function () {
      percent++
      cnt.innerHTML = percent
      water.style.transform = "translate(0" + "," + (100 - percent) + "%)"
      if (percent === Math.round(soldValueInPercentage)) {
        clearInterval(interval)
      }
    }, 20)
  }

  benzin91Gauge(sold91Per)

  const dieselGauge = (soldValueInPercentage) => {
    const cnt = document.getElementById("CountDiesel")
    const water = document.getElementById("WaterDiesel")
    let percent = cnt.innerText
    let interval
    interval = setInterval(function () {
      percent++
      cnt.innerHTML = percent
      water.style.transform = "translate(0" + "," + (100 - percent) + "%)"
      if (percent === Math.round(soldValueInPercentage)) {
        clearInterval(interval)
      }
    }, 20)
  }

  dieselGauge(soldDieselPer)

  /* end gauges */

  /* start earnings */
  function earningsFunc(totalSoldValue, totalCapacityValue) {
    const totalSoldValueToDegrees = (180 * totalSoldValue) / totalCapacityValue
    const newVal = Math.round(totalSoldValueToDegrees)

    $(".earningsGauge .semi-circle--mask").attr({
      style:
        "-webkit-transform: rotate(" +
        newVal +
        "deg);" +
        "-moz-transform: rotate(" +
        newVal +
        "deg);" +
        "transform: rotate(" +
        newVal +
        "deg);",
    })

    const cnt = document.getElementById("earningsPer")
    let percent = cnt.innerText
    let interval
    interval = setInterval(function () {
      percent++
      cnt.innerHTML = percent
      if (percent === Math.round((newVal / 180) * 100)) {
        clearInterval(interval)
      }
    }, 20)
  }
  earningsFunc(totalSold, totalCapacity)
  /* end earnings */

})
