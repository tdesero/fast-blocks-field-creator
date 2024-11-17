import { useState, useRef } from "react";
import kebabCase from "lodash/kebabCase";
import "./styles.css";
import "../node_modules/@wordpress/components/build-style/style.css";
import { Panel, PanelBody, TextControl, TabPanel, CheckboxControl, ToggleControl, BaseControl, SelectControl } from "@wordpress/components";
import { FieldsCard } from "./FieldsCard";

const printFields = (fields= {}, indent = '    ') => {
  return Object.keys(fields).map((objKey) => {
    return (
      `\n${indent}'${objKey}' => [\n` +
      `${indent}  'label' => '${fields[objKey].label}',\n` +
      `${indent}  'input' => '${fields[objKey].input}',\n` +
      `${indent}  'type' => '${fields[objKey].type}',\n` +
      `${indent}  'default' => ${fields[objKey].default},\n` +
      `${indent}  'help' => '${fields[objKey].help}',\n` +
      (fields[objKey].query
        ? `${indent}  'query' => [${printFields(
            fields[objKey].query,
            "    " + indent
          )}],\n`
        : "") +
      (fields[objKey].focalPointPicker
        ? `${indent}  'focalPointPicker' => ${fields[objKey].focalPointPicker},\n`
        : "") +
      `${indent}]`
    );
  })
}

const exampleFields = {
  test: {
    label: "Test",
    input: "text",
    type: "string",
  },
  was: {
    label: "Test",
    input: "repeater",
    type: "array",
    query: {
      blabla: {
        type: "string",
      },
    },
  },
};

export default function App() {
  const [fields, setFields] = useState({});

  const [blockName, setBlockName] = useState("blockName");
  const [blockPrefix, setBlockPrefix] = useState("fbl");
  const [blockTitle, setBlockTitle] = useState("Block Name");

  const [hasChildren, setHasChildren] = useState(false);

  const [editView, setEditView] = useState('');

  const [hasPreview, setHasPreview] = useState(true);

  return (
    <div className="AppFieldCreator">
      <div className="AppFieldCreator__main-view">
        <div className="AppFieldCreator__inner">
          <h2>{blockTitle}</h2>
          <FieldsCard {...{ fields, setFields }} />
          <br />
          <pre>
            <code>
              add_fast_block([
              <br /> 'name' {"=>"} '{blockPrefix}/{blockName}',
              <br /> 'template' {"=>"} 'blocks/{kebabCase(blockName)}.php',
              <br /> 'settings' {"=>"} [ 'title' {"=>"} '{blockTitle}' ],
              {hasChildren && `\n 'children' => true,`}
              {editView && `\n 'editView' => '${editView}',`}
              {!hasPreview && `\n 'preview' => false,`}
              <br /> 'fields' {"=>"} [ {printFields(fields || {})}
              ]
              <br />
              ]);
            </code>
          </pre>
        </div>
      </div>
      <Panel>
        <TabPanel
          initialTabName={"block"}
          tabs={[
            {
              name: "block",
              title: "Block",
            },
          ]}
        >
          {(tab) => (
            <>
              <PanelBody>
                <TextControl
                  label="Prefix"
                  onChange={setBlockPrefix}
                  value={blockPrefix}
                />
                <TextControl
                  label="Slug"
                  onChange={setBlockName}
                  value={blockName}
                />
                <TextControl
                  label="Title"
                  onChange={setBlockTitle}
                  value={blockTitle}
                />
              </PanelBody>
              <PanelBody>
                <BaseControl label="Nested Blocks">
                  <ToggleControl
                    label="Allow children"
                    onChange={setHasChildren}
                    checked={hasChildren}
                  />
                </BaseControl>
              </PanelBody>
              <PanelBody title="View Settings">
                <SelectControl
                  label="Where to display"
                  options={[
                    { value: "", label: "Inside block" },
                    { value: "inspector", label: "Inspector panel" },
                    { value: "popover", label: "Popover" },
                  ]}
                  value={editView}
                  onChange={setEditView}
                  help="Define where the fields should be displayed"
                />
                {!hasChildren && (
                  <BaseControl label="Preview">
                    <ToggleControl
                      label="Show a block preview in the editor"
                      onChange={setHasPreview}
                      checked={hasPreview}
                    />
                  </BaseControl>
                )}
              </PanelBody>
            </>
          )}
        </TabPanel>
      </Panel>
    </div>
  );
}
