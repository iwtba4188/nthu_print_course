async function main_function() {

    // @getObjectFromLocalStorage function modifying from https://gist.github.com/sumitpore/47439fcd86696a71bf083ede8bbd5466
    const getObjectFromLocalStorage = async function () {

        return new Promise((resolve, reject) => {

            try {
                chrome.storage.local.get(null, function (value) {
                    resolve(value);
                });
            } catch (ex) {
                reject(ex);
            }
        });
    };

    // 取得當前設定
    let settings = await getObjectFromLocalStorage();
    console.log(settings);

    // 確認是否為課表頁面
    var course_window = window.frames["main"];
    if (settings.tester >= 10) { course_window = window };

    head_data = course_window.document.head.getElementsByTagName("title")[0].innerHTML;
    if (head_data != "網路選課清單") { return; }

    // 生成列印頁面內容
    var print_content = "";

    var profile_content = `
    <table border="0" cellspacing="0" cellpadding="0">
    ${course_window.document.body.getElementsByTagName("table")[0].innerHTML}
    </table>`;
    var origin_course_list_content = `
    <table width="100%" border="1" cellspacing="0" cellpadding="0">
    ${course_window.document.body.getElementsByTagName("table")[1].innerHTML}
    </table>`;
    var origin_table_content = `
    <table width="100%" border="1" cellspacing="0" cellpadding="0">
    ${course_window.document.body.getElementsByTagName("table")[2].innerHTML}
    </table>`;

    console.log(origin_table_content);

    if (settings.profile) { print_content += profile_content; }
    if (settings.course_list) {
        if (!settings.course_blue) {
            var regex = /<br><font color="blue">.+<\/font>/g;
            origin_course_list_content = origin_course_list_content.replace(regex, "");
        }
        print_content += origin_course_list_content;
    }
    if (settings.course_table) {
        if (!settings.course_number) {
            var regex = /\d+[a-zA-Z ]+\d+(<br>)?/g;
            origin_table_content = origin_table_content.replace(regex, "");
        }
        if (!settings.course_room) {
            var regex = /<b>[a-zA-Z]+.+?<\/b>/g;
            origin_table_content = origin_table_content.replace(regex, "");
        }
        if (!settings.course_eng_name) {
            var regex = /[a-zA-Z \-()]+<br>/g;
            origin_table_content = origin_table_content.replace(regex, "");
        }
        print_content += origin_table_content;
    }

    if (print_content == "") {
        print_content = "你為什麼要這樣XDD";
    }

    var print_window = window.open('', '', '');
    html_content = `
                <html>
                    <head>
                        <title>
                            輸出課表
                        </title>
                    </head>
            
                    <body>
                        ${print_content}
                    </body>
                </html>
            `;

    print_window.document.open(html_content);
    print_window.document.write(html_content);
    print_window.document.close();

    print_window.print();
    print_window.close();

}

chrome.runtime.onInstalled.addListener((details) => {

    chrome.storage.local.get(function (result) {

        if (result.profile == undefined) { chrome.storage.local.set({ "profile": true }) }
        if (result.course_list == undefined) { chrome.storage.local.set({ "course_list": true }) }
        if (result.course_blue == undefined) { chrome.storage.local.set({ "course_blue": true }) }
        if (result.course_table == undefined) { chrome.storage.local.set({ "course_table": true }) }
        if (result.course_number == undefined) { chrome.storage.local.set({ "course_number": true }) }
        if (result.course_room == undefined) { chrome.storage.local.set({ "course_room": true }) }
        if (result.course_eng_name == undefined) { chrome.storage.local.set({ "course_eng_name": true }) }

        if (result.tester == undefined) { chrome.storage.local.set({ 'tester': 0 }) }
    });
});

chrome.contextMenus.create({
    "id": "print_in_nthu_ais",
    "title": "列印目前頁面的課表",
    "contexts": ["all"],
    "documentUrlPatterns": ["https://www.ccxp.nthu.edu.tw/ccxp/*"]
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {

    if (info.menuItemId !== "print_in_nthu_ais") { return }

    chrome.scripting.executeScript({

        target: { tabId: tab.id },
        function: main_function,
    });

});