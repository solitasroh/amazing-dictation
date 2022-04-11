import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { db } from '../../firebase';
import 'antd/dist/antd.css';

const { TextArea } = Input;

interface Props {
  id: number;
}
function InsertSong({ id }: Props): React.ReactElement {
  const onFinished = async (values: any) => {
    const docId = `${values.title}-${values.singer}`;
    // firebase - firestore database 내 곡 정보 저장
    await setDoc(doc(db, 'songs', docId), {
      title: values.title,
      singer: values.singer,
      question: values.question,
      pre: values.preLyrics,
      post: values.postLyrics,
      youtubeLink: values.youtubeLink,
    });
  };
  return (
    <Form
      layout="vertical"
      style={{ margin: 10 }}
      name="QuestionForm"
      onFinish={onFinished}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input placeholder="Input the title" />
      </Form.Item>
      <Form.Item
        label="YouTube"
        name="youtubeLink"
        rules={[{ required: true, message: 'Please input the youtube link!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Singer"
        name="singer"
        rules={[{ required: true, message: 'Please input the single!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Question"
        name="question"
        rules={[{ required: true, message: 'Please input the question!' }]}
      >
        <TextArea rows={4} placeholder="maxLength is 128" maxLength={128} />
      </Form.Item>
      <Form.Item
        name="preLyrics"
        label="Pre"
        rules={[{ required: true, message: 'Please input the pre-lyrics!' }]}
      >
        <TextArea rows={4} placeholder="maxLength is 128" maxLength={128} />
      </Form.Item>
      <Form.Item
        label="Post"
        name="postLyrics"
        rules={[{ required: true, message: 'Please input the post-lyrics!' }]}
      >
        <TextArea rows={4} placeholder="maxLength is 128" maxLength={128} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default InsertSong;
