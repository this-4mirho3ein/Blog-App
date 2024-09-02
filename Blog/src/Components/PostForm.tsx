import { FormEvent, useRef, useState } from "react";
import {
  Form,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Stack,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { PostData, Tags } from "../App";
import { v4 as uuidV4 } from "uuid";

type PostFormProps = {
  onSubmit: (data: PostData) => void;
  onAddTag: (tag: Tags) => void;
  availabelTags: Tags[];
} & Partial<PostData>;

const PostForm = ({
  onSubmit,
  onAddTag,
  availabelTags,
  title = "",
  markdown = "",
  tags = [],
}: PostFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const [selectedTags, setSelectedTags] = useState<Tags[]>(tags);

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("/..");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <FormLabel>عنوان</FormLabel>
              <FormControl required ref={titleRef} defaultValue={title}/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="tag">
              <FormLabel>تگ</FormLabel>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                isMulti
                value={selectedTags.map((item) => {
                  return {
                    label: item.label,
                    value: item.id,
                  };
                })}
                options={availabelTags.map((item) => {
                  return {
                    label: item.label,
                    value: item.id,
                  };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((item) => {
                      return { label: item.label, id: item.value };
                    })
                  );
                }}
                placeholder="انتخاب"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <FormGroup controlId="markdown">
            <FormLabel>پست</FormLabel>
            <FormControl required as={"textarea"} rows={15} ref={markdownRef} defaultValue={markdown}/>
          </FormGroup>
          <Stack
            direction="horizontal"
            className="justify-content-start mt-3"
            gap={2}
          >
            <Button type="submit" variant="light">
              انتشار پست
            </Button>
            <Link to={".."}>
              <Button type="button" variant="outline-light">
                لغو
              </Button>
            </Link>
          </Stack>
        </Row>
      </Stack>
    </Form>
  );
};

export default PostForm;
