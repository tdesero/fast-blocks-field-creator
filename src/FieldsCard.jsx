import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardDivider,
  Modal,
  TextControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import { Icon, edit, trash, plusCircle, blockDefault } from "@wordpress/icons";
import { iconMap } from "./iconMap";
import camelCase from "lodash/camelCase";
import {
  getTypeByInputControl,
  getDefaultValueByInputControl,
} from "./fieldTypeMap";

const updateField = ({setFields, fields, name, label, input, help, query, focalPointPicker}) => {
  if (!name) {
    return false;
  }
  setFields({
    ...fields,
    [name]: {
      label: label,
      input: input || "text",
      type: getTypeByInputControl(input),
      default: getDefaultValueByInputControl(input),
      help: help,
      ...(query ? { query } : {}),
      ...(focalPointPicker ? { focalPointPicker } : {}),
    },
  });
  return true;
};

export const FieldsCard = ({ fields = {}, setFields = () => {} }) => {
  const [isOpen, setOpen] = useState(false);
  
  return (
    <Card>
      {Object.keys(fields).map((objKey) => {
        return <Field key={objKey} {...{ fields, setFields, field: fields[objKey], objKey }} />;
      })}
      <CardBody>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              // setCurrentField(null);
              setOpen(true);
            }}
            icon={plusCircle}
            label="add"
          />
        </div>

        {isOpen &&
          <FieldsModal {...{
            fieldObjKey: '',
            field: {},
            setOpen,
            addField: (props) => updateField({setFields, fields, ...props}),
            fields
          }}/>
          }
      </CardBody>
    </Card>
  );
};

function Field({fields, setFields, field, objKey}) {
  const [isOpen, setOpen] = useState(false);

  const removeField = (name) => {
    const newFields = { ...fields };
    delete newFields[name];
    setFields(newFields);
  };

  // for repeater input
  // const [repeaterFields, setRepeaterFields] = useState(field.query);
  const repeaterFields = field.query;

  

  function setRepeaterFieldsAndParentFields(newRepeaterFields) {
    updateField({setFields, fields, name: objKey, ...field, query: newRepeaterFields});
  };

  return (
    <>
      <CardBody>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon icon={iconMap[field?.input] || blockDefault} />
          <span style={{ marginRight: "auto", marginLeft: 8 }}>{objKey}</span>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            icon={<Icon icon={edit} />}
            label={"edit"}
          />
          <Button
            onClick={() => {
              removeField(objKey);
            }}
            icon={<Icon icon={trash} />}
            label={"delete"}
          />
        </div>
        {fields[objKey].input === "repeater" && (
          <div style={{ marginTop: "0.5rem" }}>
            <FieldsCard
              fields={repeaterFields}
              setFields={setRepeaterFieldsAndParentFields}
            />
          </div>
        )}
      </CardBody>
      <CardDivider />

      {isOpen && (
        <FieldsModal
          {...{
            fieldObjKey: objKey,
            field,
            setOpen,
            addField: (props) => updateField({ setFields, fields, ...props }),
            fields,
          }}
        />
      )}
    </>
  );
}

function FieldsModal({
  fieldObjKey,
  field,
  setOpen,
  addField: addOrUpdateField,
  fields
}) {
  const [currentFieldName, setCurrentFieldName] = useState(fieldObjKey|| '');
  const [currentFieldLabel, setCurrentFieldLabel] = useState(field?.label || '');
  const [currentFieldInput, setCurrentFieldInput] = useState(field?.input || '');
  const [currentFieldHelpText, setCurrentFieldHelpText] = useState(field?.help || '');

  const [hasFocalPointPicker, setHasFocalPointPicker] = useState(false);

  const onLabelChange = (value) => {
    setCurrentFieldLabel(value);
  };

  const onNameChange = (value) => {
    setCurrentFieldName(camelCase(value));
  };

  const onInputChange = (value) => {
    setCurrentFieldInput(value);
  };
  
  return (
    <Modal
      icon={
        <Icon
          icon={iconMap[currentFieldInput] || blockDefault}
          style={{ marginRight: 8 }}
        />
      }
      title="Edit Field"
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <TextControl
        label="Field Name"
        onChange={onNameChange}
        value={currentFieldName}
        help="The name you can use in your templates later."
      />
      <TextControl
        label="Field Label"
        onChange={onLabelChange}
        value={currentFieldLabel}
      />
      <SelectControl
        label="Input Control"
        onChange={onInputChange}
        value={currentFieldInput}
        options={[
          { value: "text", label: "Text" },
          { value: "richText", label: "RichText" },
          { value: "image", label: "Image" },
          { value: "number", label: "Number" },
          { value: "checkbox", label: "Checkbox" },
          { value: "toggle", label: "Toggle" },
          { value: "email", label: "Email" },
          { value: "textarea", label: "Textarea" },
          { value: "range", label: "Range" },
          { value: "select", label: "Select" },
          { value: "file", label: "File" },
          { value: "url", label: "URL" },
          { value: "date", label: "Date" },
          {
            value: "classicEditor",
            label: "Classic Editor (Tiny MCE)",
          },
          { value: "repeater", label: "Repeater" },
          { value: "postTypeEntry", label: "PostTypeEntry" },
        ]}
      />
      {currentFieldInput === "image" && (
        <ToggleControl
          label="Show a focal point picker"
          onChange={setHasFocalPointPicker}
          checked={hasFocalPointPicker}
        />
      )}
      <TextControl
        label="Field Help Text"
        value={currentFieldHelpText}
        onChange={setCurrentFieldHelpText}
      />
      <Button
        onClick={() => {
          if (
            addOrUpdateField({
              name: currentFieldName,
              label: currentFieldLabel,
              input: currentFieldInput,
              help: currentFieldHelpText,
              ...(hasFocalPointPicker ? { focalPointPicker: hasFocalPointPicker } : {}),
            })
          ) {
            setOpen(false);
          }
        }}
        variant="primary"
      >
        {fields[currentFieldName] ? "Update existing field" : "Add Field"}
      </Button>
    </Modal>
  );
}
