        const d = document
        const myFunction = () => {
            outpp = ""
            d.getElementById("myTextarea").value.split("%").forEach(e => outpp += String.fromCharCode(parseInt(e, 16)))
            d.getElementById("oot").value = outpp
        }
        const ab = () => d.getElementById("Atob").value = atob(d.getElementById("Atob").value)
        const rot1 = () => {
            rot = []
            konk = []
            x = 0

            // seems to be minus 11 on the last 2 char
            slash = {
                "%264D": "<",// n 3c
                "%2631": " ",// c 20
                "%264E": "=",// n 3d
                "%2633": "\"",// c 22
                "%264F": ">",// n 3e
                "%261B": "\n",//n 0a
                "%263D": ",",// n 2c
                "%264B": ":",// n 3a
                "%264C": ";",// n 29 ******* odd one should be a ; 3b  . JIS X 0208 poss
                "%266C": "[",// n 5b
                "%266F": "^",// n 5e
                "%268C": "{",// n 7b
                "%2639": "(",// c 28
                "%2638": "'",// c 27
                "%2634": "#",// c 23
                "%2635": "$",// c 24
                "%266E": "]",// m 5d
                "%268E": "}", // n 7d
                "%60": "_",//n 5f
                "%3A": ".",//n  2e

                "%0A": "***1**",
                "%20": "*2****",
                "%22": "**3***",
                "%23": "**4***",
                "%24": "*5****",
                "%27": "*6****",
                "%28": "**7***",
                "%29": "***8**",
                "%2B": "**9***",
                "%2C": "**10***",
                "%2D": "*11****",
                "%2E": "**12***",
                "%2F": "**13***",
                "%30": "*14****",
                "%32": "**15*****",
                "%3A": ")",
                "%3B": "*17****",
                "%3C": "**18***",
                "%3D": "**19***",
                "%3E": "**20***",
                "%4C": "*21****",
                "%50": "*22****",
                "%5B": "Z",
                "%5D": "*24****",
                "%5F": "**25***",

                "%61": "*27****",
                "%62": "28*****",
                "%63": "**29***",
                "%64": "*30****",
                "%65": "**31***",
                "%66": "**32***",
                "%67": "**33***",
                "%68": "**34***",
                "%69": "**35***",
                "%6C": "**36***",
                "%6D": "**37***",
                "%6E": "**38***",
                "%6F": "**39***",
                "%70": "*40****",
                "%72": "**41***",
                "%73": "*42****",
                "%74": "**43***",
                "%75": "**44***",
                "%76": "*45****",
                "%77": "**46***",
                "%79": "**47***",
                "%7B": "ze",
                "%7D": "**50***"
            }

            d.getElementById("myTextarea").value.split("").map(e => {

                if (e == "%") {
                    x = -3
                    konk = []
                }

                if (konk == "%26") x -= 1

                // a is not covered
                x > 0 ? rot.push(String.fromCharCode(e.charCodeAt(0) - 1)) : konk += e
                if (konk.length > 4) {
                    rot.push(slash[konk])
                    konk = []

                }

                if (konk.length == 3 && konk != "%26") {
                    rot.push(slash[konk])
                    console.log(konk)
                    konk = []
                }
                x++
            })
            d.getElementById("myRot1").value = rot.join("")
        }

        const uni = () => d.getElementById("uni").value = String.fromCharCode(parseInt(d.getElementById("uni").value, 16))