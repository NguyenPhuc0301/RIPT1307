import { Button, List, message, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'umi';  // Import useNavigate

const HomePage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);  // Lưu danh sách câu hỏi
  const [loading, setLoading] = useState<boolean>(true);  // Trạng thái loading
  const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data.questions);  // Lưu danh sách câu hỏi vào state
        setLoading(false);  // Tắt loading khi lấy dữ liệu thành công
      } catch (error) {
        message.error('Không thể tải danh sách câu hỏi');
        setLoading(false);  // Dừng trạng thái loading nếu có lỗi
      }
    };

    fetchQuestions();
  }, []);  // Gọi khi trang được load

  if (loading) {
    return <Spin tip="Đang tải..." />;  // Hiển thị loading nếu đang tải
  }

  return (
    <div>
      <h2>Danh sách câu hỏi</h2>
      <Button
        type="primary"
        onClick={() => navigate('/post-question')}  // Sử dụng navigate để điều hướng
        style={{ marginBottom: '20px' }}
      >
        Đăng câu hỏi mới
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={questions}
        renderItem={(question) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={`/question/${question._id}`}>{question.title}</Link>  // Liên kết đến trang chi tiết bài viết
              }
              description={`Được đăng bởi: ${question.username} | Tags: ${question.tags.join(', ')}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default HomePage;
