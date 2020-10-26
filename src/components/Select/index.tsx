import React, { useEffect, useRef, useState } from 'react';
import Picker, { PickerSelectProps } from 'react-native-picker-select';
import { useField } from '@unform/core';

export default function ({ name, items, ...rest }: any) {
  const pickerRef = useRef(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: ref => {
        return ref.props.value || '';
      },
      clearValue: ref => {
        ref.props.onValueChange(ref.props.placeholder.value);
      },
      setValue: (_, value: string) => {
        setSelectedValue(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Picker
      ref={pickerRef}
      value={selectedValue}
      onValueChange={setSelectedValue}
      items={items}
      style={{
        inputAndroid: {
          fontFamily: 'Roboto-Regular',
          flex: 1,
          color: '#5e5e5e',
          fontSize: 16,
        },
        inputIOS: {
          fontFamily: 'Roboto-Regular',
          flex: 1,
          color: '#5e5e5e',
          fontSize: 16,
        },
        viewContainer: {
          paddingHorizontal: 16,
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: '#fff',
          marginBottom: 8,
          borderColor: 'transparent',
          width: '48.5%',
        },
      }}
      {...rest}
    />
  );
}
