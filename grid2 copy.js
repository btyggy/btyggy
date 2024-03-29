d = document,
c = console;
const fields = ["PSS", "tor", "powe", "pum", "cpd", "cpm", "cpy", "cpdCS", "cpmCS", "cpyCS", "hours", "powCen", "pfp", "pfpa", "pfpr", "saving", "PSSm", "erdTor", "mpkp", "erdReFl", "erdLeakage"]
  , abbs = [[!0, !0, !1, "BlanchedAlmond", "white", "white"], [!1, !1, !0, "white", "BlanchedAlmond", "BlanchedAlmond"], [!1, !1, !1, "white", "white", "white"]]
  , kVal = [4, 3.3333333333, 2.85714285714, 2.5, 2.2222222222, 2, 0]
  , listeners = ["mpb", "mrr", "mpl", "money", "rateFix"]
  , currency = ["£", "$", "€"]
  , blank = ()=>fields.forEach(e=>pairs([["", e, " ", 2]]))
  , pairs = e=>e.forEach(e=>0 != e[0] && !1 === isNaN(e[0]) && !0 === isFinite(e[0]) ? d.getElementById(e[1]).innerHTML = e[0].toFixed(e[3]) : d.getElementById(e[1]).innerHTML = e[2])
  , getv = e=>parseFloat(d.getElementById(e).value)
  , listen = ()=>{
    d.querySelectorAll(".inp").forEach(e=>e.addEventListener("keyup", looky, !1)),
    listeners.forEach(e=>d.getElementById(e).addEventListener("change", looky, !1)),
    looky()
}
  , able = (e,t,n,r,o,l)=>{
    d.getElementById("PerFlRaMD").disabled = e,
    d.getElementById("pfr").disabled = t,
    d.getElementById("mif").disabled = n,
    d.getElementById("mif").style.background = r,
    d.getElementById("PerFlRaMD").style.background = o,
    d.getElementById("pfr").style.background = l
}
  , disble = ()=>able(...abbs[d.getElementById("rateFix").value])
  , outflow = (e,t)=>{
    let n = e / t;
    d.getElementById("pfr").value = n.toFixed(2),
    d.getElementById("PerFlRaMD").value = (24 * n).toFixed(2)
}
  , getFlow = e=>{
    var t;
    let[n,r,o,l,a] = ["pfr", "PerFlRaMD", "mif", "mrr", "rateFix"].map(getv);
    var i = d.activeElement.id;
    let m;
    t = kVal[l],
    "mrr" == i && 1 == a && (m = n * t,
    d.getElementById("mif").value = m.toFixed(2),
    d.getElementById("PerFlRaMD").value = (24 * n).toFixed(2)),
    "mif" == i && outflow(o, t),
    "mrr" == i && (2 != a && 0 != a || outflow(o, t)),
    "pfr" == i && (r = 24 * n,
    o = n * t,
    d.getElementById("PerFlRaMD").value = r.toFixed(2),
    d.getElementById("mif").value = o.toFixed(2)),
    "PerFlRaMD" == i && (n = r / 24,
    o = n * t,
    d.getElementById("pfr").value = n.toFixed(2),
    d.getElementById("mif").value = o.toFixed(2))
}
  , errorMes = e=>{
    x = 1 == e ? d.getElementById("errorP") : d.getElementById("errorM"),
    x.className = "show",
    setTimeout(function() {
        x.className = x.className.replace("show", "")
    }, 1e3)
}
  , emotorP = t=>emotorChoise.find(e=>e[0] >= t)
  , emotorM = t=>emotorChoise.find(e=>e[1] >= t)
  , looky = ()=>{
    c.clear(),
    disble(),
    getFlow(),
    money = currency[parseInt(d.getElementById("money").value)];
    var [n,r,o,l,,,a,m,p] = ["mrr", "mpb", "cpkwh", "mpl", "PerFlRaMD", "PerFlRaMD", "hours", "mif", "pfr"].map(getv);
    membrainOutputPressureFig = r - offSetMembrainOutputPressure[parseInt(l)][1];
    rates[n][0];
    var s = rates[n][1];
    if (blank(),
    membrainInletFlowDay = 24 * m,
    16.07 < membrainInletFlowDay && 0 < r)
        if (chosenPump = pumps.filter(e=>e[16] >= membrainInletFlowDay && e[15] <= membrainInletFlowDay),
        0 != chosenPump) {
            var u = chosenPump[chosenPump.length - 1][0] + " " + chosenPump[chosenPump.length - 1][1];
            if (d.getElementById("pum").innerText = u,
            0 < chosenPump.length && (chosenLine = newPump.filter(e=>e[0] === chosenPump[chosenPump.length - 1][0] && e[1] === chosenPump[chosenPump.length - 1][1] && e[2] === r),
            0 != chosenLine.length)) {
                d.getElementById("pum").innerText = u;
                var h = chosenPump[chosenPump.length - 1][10]
                  , y = chosenPump[0][n + 17];
                d.getElementById("powCen").innerText = h,
                j = 550;
                let t = 0;
                for (i = 11; i < 120; i += 3) {
                    if (j += 50,
                    chosenLine[0][i] >= membrainInletFlowDay) {
                        pumpShaftSpeed = j,
                        torque = chosenLine[0][i + 1],
                        power = chosenLine[0][i + 2];
                        break
                    }
                    t += 1
                }
                var g = parseFloat(chosenLine[0][i])
                  , m = parseFloat(chosenLine[0][9])
                  , u = (g + m) / 24
                  , n = power / p
                  , h = power * a * o;
                let e = {
                    cDay: h,
                    cMonth: 31 * h,
                    cYear: 365 * h
                };
                e.cDay = money + e.cDay.toFixed(2).toString(),
                e.cMonth = money + e.cMonth.toFixed(2).toString(),
                e.cYear = money + e.cYear.toFixed(2).toString(),
                d.getElementById("pkp").innerText = parseFloat(n).toFixed(2),
                d.getElementById("cpd").innerText = e.cDay,
                d.getElementById("cpm").innerText = e.cMonth,
                d.getElementById("cpy").innerText = e.cYear,
                pairs([[pumpShaftSpeed, "PSS", " ", 2], [torque, "tor", " ", 2], [power, "powe", " ", 2], [membrainOutputPressureFig, "pfpr", " ", 2], [inletPress[chosenPump[chosenPump.length - 1][23]][t], "pfp", " ", 2]]);
                h = ERDvals.filter(e=>e[2] === s && e[1] === y && e[3] === r);
                if (0 < h.length) {
                    n = power - parseFloat(h[0][i + 4]),
                    a = (h[0][0],
                    parseFloat(h[0][4]),
                    n * offSetMembrainOutputPressure[parseInt(l)][0] * a * o),
                    o = parseFloat(h[0][11]),
                    g = ((100 - s) / 100 * g - o) / 24,
                    h = (chosenLine[0][i + 2],
                    h[0][11],
                    h[0][i + 3]);
                    d.getElementById("graph").href = "graph2.html?start1=18300&start2=25550&inc1=500&inc2=-200";
                    p = n * offSetMembrainOutputPressure[parseInt(l)][0] / p;
                    d.getElementById("mpkp").innerText = parseFloat(p).toFixed(2);
                    let e = {
                        cDay: a,
                        cMonth: 31 * a,
                        cYear: 365 * a
                    };
                    e.cDay = money + e.cDay.toFixed(2).toString(),
                    e.cMonth = money + e.cMonth.toFixed(2).toString(),
                    e.cYear = money + e.cYear.toFixed(2).toString(),
                    d.getElementById("cpdCS").innerText = e.cDay,
                    d.getElementById("cpmCS").innerText = e.cMonth,
                    d.getElementById("cpyCS").innerText = e.cYear,
                    pairs([[n * offSetMembrainOutputPressure[parseInt(l)][0], "saving", " ", 2], [m / 24, "pl", " ", 2], [o / 24, "erdLeakage", " ", 2], [g, "erdReFl", " ", 2], [torque - h, "erdTor", " ", 2], [pumpShaftSpeed, "PSSm", " ", 2], [u, "pfpa", " ", 2]]),
                    "Consult TWHC" === inletPress[chosenPump[chosenPump.length - 1][23]][t] && (d.getElementById("pfp").innerText = "Consult TWHC")
                } else
                    errorMes(2)
            }
        } else
            errorMes(1);
    else
        errorMes(1),
        c.log("this is the trap for being off the figures")
}
;
