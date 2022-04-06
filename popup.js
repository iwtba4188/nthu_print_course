let btn_profile = document.getElementById('profile');
let btn_course_list = document.getElementById('course_list');
let btn_course_blue = document.getElementById('course_blue');
let btn_course_table = document.getElementById('course_table');
let btn_course_number = document.getElementById('course_number');
let btn_course_room = document.getElementById('course_room');
let btn_course_eng_name = document.getElementById('course_eng_name');

function set_button_status() {

    chrome.storage.local.get(function (result) {
        btn_profile.className = ((result.profile) ? "on_btn" : "off_btn");
        btn_course_list.className = ((result.course_list) ? "on_btn" : "off_btn");
        btn_course_blue.className = ((result.course_blue) ? "on_btn" : "off_btn");
        btn_course_table.className = ((result.course_table) ? "on_btn" : "off_btn");
        btn_course_number.className = ((result.course_number) ? "on_btn" : "off_btn");
        btn_course_room.className = ((result.course_room) ? "on_btn" : "off_btn");
        btn_course_eng_name.className = ((result.course_eng_name) ? "on_btn" : "off_btn");

        if (!result.course_list) {
            btn_course_blue.className = "empty_btn";
        }
        if (!result.course_table) {
            btn_course_number.className = "empty_btn";
            btn_course_room.className = "empty_btn";
            btn_course_eng_name.className = "empty_btn";
        }
    });
}

function change_btn_type(button) {

    if (button.className == "empty_btn") { return; }
    button.className = ((button.className == "on_btn") ? "off_btn" : "on_btn");
}

function show_storage_local() {

    chrome.storage.local.get(function (result) {
        console.log(result);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    set_button_status();

    btn_profile.addEventListener('click', function () {

        if (btn_profile.className == "empty_btn") { return; }

        change_btn_type(btn_profile);
        chrome.storage.local.get(function (result) {
            chrome.storage.local.set({ "profile": !result.profile });
        });
    });

    btn_course_list.addEventListener('click', function () {

        if (btn_course_list.className == "empty_btn") { return; }

        change_btn_type(btn_course_list);
        chrome.storage.local.get(function (result) {
            chrome.storage.local.set({ "course_list": !result.course_list });

            if (!result.course_list) {
                btn_course_blue.className = ((result.course_blue) ? "on_btn" : "off_btn");
            } else {
                btn_course_blue.className = "empty_btn";
            }
        });
    });

    btn_course_blue.addEventListener('click', function () {

        if (btn_course_blue.className == "empty_btn") { return; }

        change_btn_type(btn_course_blue);
        chrome.storage.local.get(function (result) {
            chrome.storage.local.set({ "course_blue": !result.course_blue });
        });
    });

    btn_course_table.addEventListener('click', function () {

        if (btn_course_table.className == "empty_btn") { return; }

        change_btn_type(btn_course_table);
        chrome.storage.local.get(function (result) {
            chrome.storage.local.set({ "course_table": !result.course_table });

            if (!result.course_table) {
                btn_course_number.className = ((result.course_number) ? "on_btn" : "off_btn");
                btn_course_room.className = ((result.course_room) ? "on_btn" : "off_btn");
                btn_course_eng_name.className = ((result.course_eng_name) ? "on_btn" : "off_btn");
            } else {
                btn_course_number.className = "empty_btn";
                btn_course_room.className = "empty_btn";
                btn_course_eng_name.className = "empty_btn";
            }
        });
    });

    btn_course_number.addEventListener('click', function () {

        if (btn_course_number.className == "empty_btn") { return; }

        change_btn_type(btn_course_number);
        chrome.storage.local.get(function (result) {
            chrome.storage.local.set({ "course_number": !result.course_number });
        });
    });

    btn_course_room.addEventListener('click', function () {

        if (btn_course_room.className == "empty_btn") { return; }

        change_btn_type(btn_course_room);
        chrome.storage.local.get(function (result) {
            chrome.storage.local.set({ "course_room": !result.course_room });
        });
    });

    btn_course_eng_name.addEventListener('click', function () {

        if (btn_course_eng_name.className == "empty_btn") { return; }

        change_btn_type(btn_course_eng_name);
        chrome.storage.local.get(function (result) {
            chrome.storage.local.set({ "course_eng_name": !result.course_eng_name });
        });
    });

    document.getElementById('github_link').addEventListener('click', function () {

        chrome.tabs.create({
            url: "https://github.com/iwtba4188/nthu_print_course",
            active: true
        });
    });
})
