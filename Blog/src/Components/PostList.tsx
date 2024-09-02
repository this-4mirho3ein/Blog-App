import {
  Col,
  Row,
  Stack,
  Form,
  Button,
  Card,
  Badge,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Post, Tags } from "../App";
import { useMemo, useState } from "react";

type PostCardProps = {
  tags: Tags[];
  title: string;
  id: string;
};

type PostListProps = {
  availabelTags: Tags[];
  posts: PostCardProps[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

type EditTagsModal = {
  show: boolean;
  availabelTags: Tags[];
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

const PostList = ({
  availabelTags,
  posts,
  onDeleteTag,
  onUpdateTag,
}: PostListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      return (
        (title === "" ||
          item.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            item.tags.some((postTag) => postTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, posts]);

  return (
    <>
      <Row className="align-item-cenetr mb-4">
        <Col>
          <h2>پست ها</h2>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/add"}>
              <Button variant="light">افزودن پست</Button>
            </Link>
            <Button
              variant="outline-light"
              onClick={() => setEditTagsModalIsOpen(true)}
            >
              ویرایش تگ ها
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>عنوان</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tag">
              <Form.Label>تگ</Form.Label>
              <ReactSelect value={selectedTags.map((item)=> {
                return { label:item.label , value : item.id}
              })  }
              options={availabelTags.map((item)=>{
                return {label:item.label , value : item.id}
              })}
              onChange={(tags)=>{
                setSelectedTags(tags.map((item)=> {
                  return {label : item.label , id : item.value}
                }))
              }}
              isMulti
              placeholder='انتخاب'
            />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} xl={4} className="g-3">
        {filteredPosts.map((item) => (
          <Col key={item.id}>
            <PostCard id={item.id} title={item.title} tags={item.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availabelTags={availabelTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
};

function PostCard({ id, title, tags }: PostCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className="h-100 text-reset text-decoration-none"
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5 text-black">{title}</span>
          {tags.length > 0} && (
          <Stack
            gap={1}
            direction="horizontal"
            className="justify-align-content-center flex-wrap"
          >
            {tags.map((tag) => (
              <Badge className="text-reuncate" key={tag.id}>
                {tag.label}
              </Badge>
            ))}
          </Stack>
          )
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditTagsModal({
  availabelTags,
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModal) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ویرایش تگ ها</Modal.Title>
        <Modal.Body>
          <Form>
            <Stack gap={2}>
              {availabelTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      type="text"
                      value={tag.label}
                      onChange={(e) => onUpdateTag(tag.id, e?.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button onClick={()=>onDeleteTag(tag.id)} variant="outline-none">&times;</Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
}

export default PostList;
