import { List, message } from 'antd'; // Xóa Button nếu không cần sử dụng
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    // Lấy danh sách câu hỏi từ backend
    axios
      .get('http://localhost:5000/api/questions')
      .then((response) => {
        setQuestions(response.data.questions); // Lưu danh sách câu hỏi vào state
      })
      .catch(() => {
        message.error('Không thể tải danh sách câu hỏi'); // Xóa biến error nếu không sử dụng
      });
  }, []);

  return (
    <div>
      <h2>Danh sách câu hỏi</h2>
      <List
        itemLayout="horizontal"
        dataSource={questions}
        renderItem={(question) => (
          <List.Item>
            <List.Item.Meta
              title={<a href={`/question/${question._id}`}>{question.title}</a>}
              description={`Được đăng bởi: ${
                question.username
              } | Tags: ${question.tags.join(', ')}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuestionsPage;
