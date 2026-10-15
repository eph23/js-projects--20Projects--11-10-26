"use strict";

const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

var VoiceRSS = {
    speech: function (e) {
        this._validate(e);
        this._request(e);
    },

    _validate: function (e) {
        if (!e) throw "The settings are undefined";
        if (!e.key) throw "The API key is undefined";
        if (!e.src) throw "The text is undefined";
        if (!e.hl) throw "The language is undefined";

        if (e.c && e.c.toLowerCase() !== "auto") {
            var a = true;

            switch (e.c.toLowerCase()) {
                case "mp3":
                    a = new Audio().canPlayType("audio/mpeg").replace("no", "");
                    break;

                case "wav":
                    a = new Audio().canPlayType("audio/wav").replace("no", "");
                    break;

                case "aac":
                    a = new Audio().canPlayType("audio/aac").replace("no", "");
                    break;

                case "ogg":
                    a = new Audio().canPlayType("audio/ogg").replace("no", "");
                    break;

                case "caf":
                    a = new Audio()
                        .canPlayType("audio/x-caf")
                        .replace("no", "");
                    break;
            }

            if (!a) {
                throw "The browser does not support the audio codec " + e.c;
            }
        }
    },

    _request: function (e) {
        var a = this._buildRequest(e);
        var t = this._getXHR();

        t.onreadystatechange = function () {
            if (t.readyState === 4 && t.status === 200) {
                if (t.responseText.indexOf("ERROR") === 0) {
                    throw t.responseText;
                }

                audioElement.src = t.responseText;

                audioElement.play().catch(function (error) {
                    console.error("Audio playback failed:", error);
                });
            }
        };

        t.open("POST", "https://api.voicerss.org/", true);

        t.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8",
        );

        t.send(a);
    },

    _buildRequest: function (e) {
        var a = e.c && e.c.toLowerCase() !== "auto" ? e.c : this._detectCodec();

        return (
            "key=" +
            encodeURIComponent(e.key || "") +
            "&src=" +
            encodeURIComponent(e.src || "") +
            "&hl=" +
            encodeURIComponent(e.hl || "") +
            "&v=" +
            encodeURIComponent(e.v || "") +
            "&r=" +
            encodeURIComponent(e.r || "") +
            "&c=" +
            encodeURIComponent(a || "") +
            "&f=" +
            encodeURIComponent(e.f || "") +
            "&ssml=" +
            encodeURIComponent(e.ssml || "") +
            "&b64=true"
        );
    },

    _detectCodec: function () {
        var e = new Audio();

        return e.canPlayType("audio/mpeg").replace("no", "")
            ? "mp3"
            : e.canPlayType("audio/wav").replace("no", "")
              ? "wav"
              : e.canPlayType("audio/aac").replace("no", "")
                ? "aac"
                : e.canPlayType("audio/ogg").replace("no", "")
                  ? "ogg"
                  : e.canPlayType("audio/x-caf").replace("no", "")
                    ? "caf"
                    : "";
    },

    _getXHR: function () {
        try {
            return new XMLHttpRequest();
        } catch (e) {}

        try {
            return new ActiveXObject("Msxml3.XMLHTTP");
        } catch (e) {}

        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        } catch (e) {}

        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        } catch (e) {}

        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {}

        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}

        throw "The browser does not support HTTP request";
    },
};

function test() {
    VoiceRSS.speech({
        key: "ee3521173e654ee5bab728db7cdb2ef8",
        src: "Hello, world!",
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
}

test();
