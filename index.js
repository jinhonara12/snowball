import { Client } from "@notionhq/client";
import dotenv from "dotenv"

dotenv.config();
const NOTION_KEY = process.env.NOTION_KEY;
const FEST_KEY = process.env.NOTION_FEST_ID;
const NOTION = new Client({ auth: NOTION_KEY });

/* 
1. 데이타베이스 'query' 메서드로 데이터베이스에 있는 내용(배열) 가져오기
2. 배열 내 있는 id 프로퍼티 배열로 받아두기
*/

const getPageProperty = async (id_array) => {
    const PROPERTY_OBJECT = [];
    for (let i = 0; i < id_array.length; i++) {
        const response = await NOTION.pages.retrieve({ page_id: id_array[i].id })
        PROPERTY_OBJECT.push({
            title: response.properties.name.title[0].plain_text,
            start_date: response.properties.date.date.start,
            end_date: response.properties.date.date.end ? response.properties.date.date.end : '',
            link: response.properties.link.url ? response.properties.link.url : '',
            emoji: response.icon ? response.icon.emoji : '',
        })
    }
    console.log(PROPERTY_OBJECT)
}

const getPgaeID = (result_array) => {
    const ID_ARRAY = [];
    result_array.forEach((el) => {
        let { id } = el
        ID_ARRAY.push({ id })
    })
    getPageProperty(ID_ARRAY)
}

const getFestPages = async () => {
    const response = await NOTION.databases.query({
        database_id: FEST_KEY,
        sorts: [{
            property: 'date',
            direction: 'descending',
        }]
    });
    getPgaeID(response.results);
}

getFestPages()
