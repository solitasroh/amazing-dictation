import React, {ReactElement} from 'react';
import {Input, Button, Form} from 'antd';

interface props {
    id: string
}

interface CreateGameInput {
    title: string;
    singer: string;
    preSectionLyrics: string;
    postSectionLyrics: string;
    questionLyrics: string;
    prePlaySection: string;
    playTime: string;
    preSectionPlayStartTime: number;
    preSectionPlayEndTime: number;
    questionSectionPlayStartTime: number;
    questionSectionPlayEndTime: number;
    songYoutubeLinkUrl: string;
    musicFileLinkUrl: string;
}

function CreateGame({id}: props): ReactElement {
    const onFinish = (values: any) => {
        console.log(values)
    }
    const onFinishFailed = () => {
        console.log('fail')
    }
    return (

        <Form labelCol={{span: 4}}
              wrapperCol={{span: 16}}
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
            <Form.Item label="곡명" name="title">
                <Input placeholder="title" width="180px"/>
            </Form.Item>
            <Form.Item label="가수" name="singer">
                <Input placeholder="singer"/>
            </Form.Item>
            <Form.Item label="앞 가사" name="preSectionLyrics">
                <Input placeholder="pre section lyrics"/>
            </Form.Item>
            <Form.Item label="뒷 가사" name="postSectionLyrics">
                <Input placeholder="post section lyrics"/>
            </Form.Item>
            <Form.Item label="문제 가사" name="questionLyrics">
                <Input placeholder="question lyrics"/>
            </Form.Item>
            <Form.Item label="문제 시작 구간" name="prePlaySection">
                <Input placeholder="pre play section"/>
            </Form.Item>
            <Form.Item label="play time" name="playTime">
                <Input placeholder="play time"/>
            </Form.Item>
            <Form.Item label="앞 구간 시작 시간" name="preSectionPlayStartTime">
                <Input placeholder="pre Section Play Start Time"/>
            </Form.Item>
            <Form.Item label="앞 구간 종료 시간" name="preSectionPlayEndTime">
                <Input placeholder="pre Section Play End Time"/>
            </Form.Item>
            <Form.Item label="문제 구간 시작 시간" name="questionSectionPlayStartTime">
                <Input placeholder="question Section Play Start Time"/>
            </Form.Item>
            <Form.Item label="문제 구간 종료 시간" name="questionSectionPlayEndTime">
                <Input placeholder="question Section Play End Time"/>
            </Form.Item>
            <Form.Item label="youtube link" name="songYoutubeLinkUrl">
                <Input placeholder="song Youtube Link Url"/>
            </Form.Item>
            <Form.Item label="file link" name="musicFileLink">
                <Input placeholder="music file link"/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 4, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default CreateGame;


