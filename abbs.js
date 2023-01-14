    d = document
    let sheeps = []
    let img = d.getElementById("sheep")
    let imgG = d.getElementById("sheepG")
    let onion = d.getElementById("onion")
    let otherSheep = d.getElementById("otherSheep")
    let canvas = d.getElementById("canvas");
    let ctx = canvas.getContext("2d")
    let x1, y1, x2, y2, posx, posy, br
    let q = 0

    const types = {
        0: img,
        1: onion,
        2: otherSheep,
        3: imgG
    }

    const rando = (i) => Math.floor(Math.random() * i)

    const playAudio = (url) => new Audio(url).play()

    const draw = (e) => {
        var pos = getMousePos(canvas, e);
        posx = pos.x;
        posy = pos.y;
    }

    function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    const colourRect = (leftX, topY, width, height, drawColor) => {
        ctx.fillStyle = drawColor
        ctx.fillRect(leftX, topY, width, height)
    }

    const addSheep = () => {
        sheepName = d.getElementById("sheepName").value
        sex = d.querySelector('input[name="sex"]:checked').value
        age = d.getElementById("age").value
        if (q > 9) {
            sheepName = "Onion"
            sex = 1
            age = 6
            br = 1
            q = 0
        } else {
            br = 0
            q += 1
        }
        sheeps.push([sheepName, sex, age, br, rando(499), rando(499), rando(10) > 5 ? 1 : -1, rando(10) > 5 ? 1 : -1])
    }

    const moveS = (sheepX, sheepY, x2, y2, brand) => {
        if (sheepX > 460) x2 = -1
        if (sheepX < 1) x2 = Math.random() * 1
        sheepX = x2 + sheepX
        if (sheepY > 460) y2 = -1
        if (sheepY < 1) y2 = Math.random() * 1
        sheepY = y2 + sheepY
        ctx.drawImage(types[brand], sheepX, sheepY)
        // sheep to mouse
        ctx.drawImage(types[2], posx, posy)
        return [sheepX, sheepY, x2, y2]
    }

    const moveSA = () => {
        colourRect(0, 0, 500, 500, "green")
        sheeps.forEach((e, i) => {
            [sheeps[i][4], sheeps[i][5], sheeps[i][6], sheeps[i][7]] = moveS(e[4], e[5], e[6], e[7], e[3])
        })
    }

    const clicky = () => {
        let cr = " "
        sheeps.forEach(e => {
            if (e[4] >= posx - 20 && e[4] <= posx + 20 && e[5] >= posy - 20 && e[5] <= posy + 20) {
                cr = e[0]
            }
            d.getElementById("listy2").innerText = cr
        })
    }

    d.getElementById("addBut").addEventListener("click", addSheep)
    window.addEventListener('mousemove', draw, false);
    window.addEventListener('click', clicky, false)
    setInterval(moveSA, 40);