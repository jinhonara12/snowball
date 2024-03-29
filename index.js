import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import fs from "fs";
import http from "http";

dotenv.config();

const NOTION_KEY = process.env.NOTION_KEY;
const FEST_KEY = process.env.NOTION_FEST_ID;
const NOTION = new Client({ auth: NOTION_KEY });

/* 
1. 데이타베이스 'query' 메서드로 데이터베이스에 있는 내용(배열) 가져오기
2. 배열 내 있는 id 프로퍼티 배열로 받아두기
3. id값의 특정 프로퍼티를 json 파일에 저장
*/

const createList = (data) => {
    fs.writeFileSync('./list.json', JSON.stringify(data, null, 2))
}

const getPageProperty = async (id_array) => {
    const PROPERTY_OBJECT = [];
    for (let i = 0; i < id_array.length; i++) {
        const response = await NOTION.pages.retrieve({ page_id: id_array[i].id })
        PROPERTY_OBJECT.push({
            title: response.properties.name.title[0].plain_text,
            start_date: response.properties.date.date ? response.properties.date.date.start : '',
            end_date: response.properties.date.date && response.properties.date.date.end ? response.properties.date.date.end : '',
            d_date: response.properties.d_day.formula.string ? response.properties.d_day.formula.string : "",
            link: response.properties.link.url ? response.properties.link.url : '',
            emoji: response.icon ? response.icon.emoji : '',
        })
    }

    createList(PROPERTY_OBJECT)
}

const getPgaeID = (result_array) => {
    const ID_ARRAY = [];
    result_array.forEach((el) => {
        let { id } = el
        ID_ARRAY.push({ id })
    })
    getPageProperty(ID_ARRAY)
}

const getFestPages = async (req, res) => {
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


/* 
서버와 클라이어트 요청 응답 부분
    - 홈페이지 접속 시 노션에 데이터가 업데이트 되었는지 확인 필요
    - 또는 노션에 데이터가 업데이트 되면 서버에 list.json 업데이트
*/