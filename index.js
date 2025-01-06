const container = document.querySelector("main")


//creates a new element and adds a css class to it
function _newElement(element, cssClass) {
    let x = document.createElement(element);
    x.classList = (cssClass);
    return x;
}

function _get_hh_id(sharpness_url) {
    sharpness_url = sharpness_url.replace("sharpness/", "")
    sharpness_url = sharpness_url.replace(".png", "")
    return sharpness_url

}


function _get_attr_img_src(attr_type) {
    switch (attr_type) {
        case "LI":
            return "img/attributes/attr_lightning.png"
        case "FI":
            return "img/attributes/attr_fire.png"
        case "DR":
            return "img/attributes/attr_dragon.png"
        case "IC":
            return "img/attributes/attr_ice.png"
        case "PA":
            return "img/attributes/attr_paralysis.png"
        case "PO":
            return "img/attributes/attr_poison.png"
        case "SLM":
            return "img/attributes/attr_slime.png"
        case "WA":
            return "img/attributes/attr_water.png"

    }
}

function _get_note_img_src(starting_char){
    starting_char = starting_char.toLowerCase()
    switch(starting_char){
        case "b":
            return "img/notes/note_blue.png"
        case "c":
            return "img/notes/note_cyan.png"
        case "g":
            return "img/notes/note_green.png"
        case "o":
            return "img/notes/note_orange.png"
        case "p":
            return "img/notes/note_purple.png"
        case "r":
            return "img/notes/note_red.png"
        case "w":
            return "img/notes/note_white.png"
        case "y":
            return "img/notes/note_yellow.png"
    }
}




function generate(data) {

    for (let row of data) {

        let div1 = _newElement("div", "container col-xl-8")
        let div2 = _newElement("div", "row flex-lg-row align-items-center g-5 py-5")
        let div3 = _newElement("div", "col-lg-10")

        let header = _newElement("h1", "display-5 fw-bold text-body-emphasis lh-1 mb-3")

        let id = _get_hh_id(row["sharpness"])
        console.log("Generating node: " + id)
        header.id = id

        header.innerText = row["name"]

        let table = _newElement("table", "table table-bordered")
        let tbody = _newElement("tbody", "")
        let tr_attack = _newElement("tr", "")
        let td_attack = _newElement("td", "")
        let td_attack_val = _newElement("td", "")


        td_attack.innerText = "Attack"
        td_attack_val.innerText = row["attack"]

        tr_attack.append(td_attack)
        tr_attack.append(td_attack_val)

        let tr_attribute = _newElement("tr", "")
        let td_attribute = _newElement("td", "")
        let td_attribute_val = _newElement("td", "")

        td_attribute.innerText = "Attribute"
        tr_attribute.append(td_attribute)

        if (row["attribute_type"] && row["attribute_damage"]) {
            let span = _newElement("span", "")
            span.innerText = row["attribute_damage"]
            let img = _newElement("img", "")
            let src_url = _get_attr_img_src(row["attribute_type"])
            img.src = src_url
            td_attribute_val.append(img)
            td_attribute_val.append(span)
            tr_attribute.append(td_attribute_val)


        } else {

            tr_attribute.append(td_attribute_val)
        }

        let tr_affinity = _newElement("tr", "")
        let td_affinity = _newElement("td", "")
        let td_affinity_val = _newElement("td", "")

        let tr_notes = _newElement("tr", "")
        let td_notes = _newElement("td", "")
        let td_notes_val = _newElement("td", "")


        td_affinity.innerText = "Affinity"
        td_affinity_val.innerText = row["affinity"] + "%"

        tr_affinity.append(td_affinity)
        tr_affinity.append(td_affinity_val)

        td_notes.innerText = "Notes"

        let string_notes = row["notes"]
        let notes = string_notes.split("-")

        for(let note of notes){
            let starting_char = note[0]
            let img_src = _get_note_img_src(starting_char)
            let img = _newElement("img")
            img.src = img_src
            td_notes_val.append(img)
        }

        tr_notes.append(td_notes)
        tr_notes.append(td_notes_val)


        let tr_sharpness = _newElement("tr", "")
        let td_sharpness = _newElement("td", "") 
        let td_sharpness_val = _newElement("td", "")

        td_sharpness.innerText = "Sharpness"

        let sharp_img = _newElement("img", "")

        let sharp_img_src = "img/" + row["sharpness"]
        sharp_img.src = sharp_img_src
        td_sharpness_val.append(sharp_img)

        tr_sharpness.append(td_sharpness)
        tr_sharpness.append(td_sharpness_val)


        let tr_defense = _newElement("tr", "")
        let td_defense = _newElement("td", "")
        let td_defense_val = _newElement("td", "")
        td_defense.innerText = "Defense"
        td_defense_val.innerText = row["defense"]
        tr_defense.append(td_defense)
        tr_defense.append(td_defense_val)

        let tr_slots = _newElement("tr", "")
        let td_slots = _newElement("td", "")
        let td_slots_val = _newElement("td", "")
        td_slots.innerText = "Slots"
        td_slots_val.innerText = row["slots"]
        tr_slots.append(td_slots)
        tr_slots.append(td_slots_val)

        let tr_songs = _newElement("tr", "")
        let td_songs = _newElement("td", "d-flex flex-wrap")

        for(let song of row["songs"]){
            let song_div = _newElement("div", "p-4")
            let song_name = _newElement("span", "")
            song_name.innerText = song["name"]

            for(let note of song["notes"]){
                let img = _newElement("img", "")
                let img_src = _get_note_img_src(note)
                img.src = img_src
                song_div.append(img)
            }
            song_div.append(_newElement("br", ""))
            song_div.append(song_name)
            td_songs.append(song_div)

        }
        tr_songs.append(td_songs)
        
    

        tbody.append(tr_attack)
        tbody.append(tr_attribute)
        tbody.append(tr_affinity)
        tbody.append(tr_notes)
        tbody.append(tr_sharpness)
        tbody.append(tr_defense)
        tbody.append(tr_slots)
        tbody.append(tr_songs)

        table.append(tbody)
        div3.append(header)
        div3.append(table)
        div2.append(div3)
        div1.append(div2)
        container.append(div1)

    }
}


function main(data) {
    generate(data)
}


fetch("./data.json")
    .then(resp => resp.json())
    .then(data => main(data))
    .catch(error => console.error(error))