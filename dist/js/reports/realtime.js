// dispenser number animation
$(document).ready(function () {
  const terminateNozzle = (nozzleId) => {
    $("#" + nozzleId).removeClass("working")
    $(`#${nozzleId} .disp__litre`).text('00.000')
    $(`#${nozzleId} .disp__price`).text('00.000')
    $(`#${nozzleId} .disp__amount`).text('00.000')
  }
  const triggerNozzle = (nozzleId, litre, pricePerLitre) => {
    /* start interactions */
    $("#" + nozzleId).addClass("working")
    $(`#${nozzleId} .disp__litre`).text(litre.toLocaleString())
    $(`#${nozzleId} .disp__price`).text(pricePerLitre.toLocaleString())
    $(`#${nozzleId} .disp__amount`).text(
      (pricePerLitre * litre).toLocaleString()
    )
  }

  // just for try
  // $("#btn11").click(() => {
  //   triggerNozzle("disp1Nozzle1", 200, 2)
  // })
  // $("#btn22").click(() => {
  //   triggerNozzle("disp1Nozzle1", 400, 2)
  // })
  // $("#btn33").click(() => {
  //   terminateNozzle("disp1Nozzle1")
  // })
  // $("#btn44").click(() => {
  //   triggerNozzle("disp1Nozzle4", 200, 2)
  // })
  // $("#btn55").click(() => {
  //   terminateNozzle("disp1Nozzle4")
  // })

  /* Nozz */
  const terminateNozz = (nozzleId) => {
    $("#" + nozzleId).removeClass("working")
    $(`#${nozzleId} .nozz__litre`).text('00.000')
    $(`#${nozzleId} .nozz__price`).text('00.000')
    $(`#${nozzleId} .nozz__amount`).text('00.000')
  }
  
  const triggerNozz = (nozzleId, litre, pricePerLitre) => {
    /* start interactions */
    $("#" + nozzleId).addClass("working")
    $(`#${nozzleId} .nozz__litre`).text(litre.toLocaleString())
    $(`#${nozzleId} .nozz__price`).text(pricePerLitre.toLocaleString())
    $(`#${nozzleId} .nozz__amount`).text(
      (pricePerLitre * litre).toLocaleString()
    )
  }
  // just for try
  $("#btnx").click(() => {
    triggerNozz("nozz1", 2034540, 2)
  })
  $("#btnxx").click(() => {
    terminateNozz("nozz1")
  })

  /* Tanks */
  //   ------------= volume / capacity *100
  const volumePer95 = (700 / 1000) * 100
  const volumePer91 = (200 / 1119) * 100
  const volumePerDiesel = (213 / 300) * 100

  const benzin95Gauge = (volumeValueInPercentage) => {
    const cnt = document.getElementById("Count95")
    const water = document.getElementById("Water95")
    let percent = cnt.innerText
    let interval
    interval = setInterval(function () {
      percent++
      cnt.innerHTML = percent
      water.style.transform = "translate(0" + "," + (100 - percent) + "%)"
      if (percent === Math.round(volumeValueInPercentage)) {
        clearInterval(interval)
      }
    }, 20)
  }

  benzin95Gauge(volumePer95)

  const benzin91Gauge = (volumeValueInPercentage) => {
    const cnt = document.getElementById("Count91")
    const water = document.getElementById("Water91")
    let percent = cnt.innerText
    let interval
    interval = setInterval(function () {
      percent++
      cnt.innerHTML = percent
      water.style.transform = "translate(0" + "," + (100 - percent) + "%)"
      if (percent === Math.round(volumeValueInPercentage)) {
        clearInterval(interval)
      }
    }, 20)
  }

  benzin91Gauge(volumePer91)

  const dieselGauge = (volumeValueInPercentage) => {
    const cnt = document.getElementById("CountDiesel")
    const water = document.getElementById("WaterDiesel")
    let percent = cnt.innerText
    let interval
    interval = setInterval(function () {
      percent++
      cnt.innerHTML = percent
      water.style.transform = "translate(0" + "," + (100 - percent) + "%)"
      if (percent === Math.round(volumeValueInPercentage)) {
        clearInterval(interval)
      }
    }, 20)
  }

  dieselGauge(volumePerDiesel)

  /* end gauges */
  /* 
  //
  //
  //
  */
})
