import React, { Component } from 'react';
// import { Debounce } from '../../utils/debounceUtil'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import loadsh from 'lodash'
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),

  }

  componentWillReceiveProps(nextProps) {
    // 匹配富文本编辑器格式，回显保存的内容
    if (nextProps.richText) {
      const contentBlock = htmlToDraft(nextProps.richText);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({ editorState })
      }
    }


  }

  onEditorStateChange = loadsh.debounce((editorState) => {
    // console.log('~~~~~~~')
    this.setState({
      editorState,
    });
  }, 100)

  uploadImageCallBack = file => {
    //   console.log()
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  // 自定义返回输入的文本内容
  getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  render() {
    const { editorState } = this.state;
    return (
      <div style={{ width: '800px' }}>
        <Editor
          editorState={editorState}
          editorStyle={{ height: 600, border: '1px solid #000', paddingLeft: '10px' }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    );
  }
}