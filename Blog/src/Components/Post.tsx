import { usePost } from "./PostLayout";
import { Row, Col, Stack, Badge, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";

type PostProps = {
  onDelete: (id: string) => void;
};

const Post = ({ onDelete }: PostProps) => {
  const post = usePost();
  const navigate = useNavigate()
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>{post.title}</h2>
          {post.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {post.tags.map((item) => (
                <Badge key={item.id} className="text-truncate">
                  {item.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${post.id}/edit`}>
              <Button className="mx-1" variant="light">
                ویرایش
              </Button>
              <Button
                className="mx-1"
                variant="outline-light"
                onClick={() => {
                  onDelete(post.id);
                  navigate('/')
                }}
              >
                حذف
              </Button>
              <Link className="mx-1" to={"/"}>
                <Button variant="outline-light">بازگشت</Button>
              </Link>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{post.markdown}</ReactMarkdown>
    </>
  );
};

export default Post;
