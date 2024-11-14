import { useState, useRef } from "react";
import kebabCase from "lodash/kebabCase";
import "./styles.css";
import "../node_modules/@wordpress/components/build-style/style.css";
import { Panel, PanelBody, TextControl, TabPanel } from "@wordpress/components";
import { FieldsCard } from "./FieldsCard";

export default function App() {
  const [fields, setFields] = useState({
    test: {
      label: 'Test',
      input: 'text',
      type: 'string',
    },
    was: {
      label: 'Test',
      input: 'repeater',
      type: 'array',
      query: {
        blabla: {
          type: 'string'
        }
      }
    }
  });

  const [blockName, setBlockName] = useState("blockName");
  const [blockPrefix, setBlockPrefix] = useState("fbl");
  const [blockTitle, setBlockTitle] = useState("Block Name");

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
              <br /> 'settings' {"=>"} [ 'title' {"=>"} '{blockTitle}'],
              <br /> 'fields' {"=>"} [{" "}
              {Object.keys(fields).map((objKey) => {
                return (
                  `\n  '${objKey}' => [\n` +
                  `    'label' => '${fields[objKey].label}',\n` +
                  `    'input' => '${fields[objKey].input}',\n` +
                  `    'type' => '${fields[objKey].type}',\n` +
                  `    'default' => ${fields[objKey].default},\n` +
                  `    'help' => '${fields[objKey].help}',\n` +
                  `    'query' => '${JSON.stringify(
                    fields[objKey].query
                  )}',\n` +
                  `  ]\n`
                );
              })}
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
            <PanelBody>
              <TextControl
                label="Block Prefix"
                onChange={setBlockPrefix}
                value={blockPrefix}
              />
              <TextControl
                label="Block Slug"
                onChange={setBlockName}
                value={blockName}
              />
              <TextControl
                label="Block Title"
                onChange={setBlockTitle}
                value={blockTitle}
              />
            </PanelBody>
          )}
        </TabPanel>
      </Panel>
    </div>
  );
}
