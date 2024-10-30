import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import React, { useState } from 'react';
import { CollectionChildren, Key } from '@react-types/shared';

interface Props {
  label: string;
  defaultItems: any;
  children: CollectionChildren<any>;
  className?: string;
}

export default function AutocompleteCustom({
  label,
  defaultItems,
  children,
  className,
}: Props) {
  const [key, setKey] = useState<Key>('');

  const handleSelectionChange = (key: Key | null) => {
    if (key) setKey(key);
  };

  const resetField = () => {
    setKey('');
  };

  return (
    <Autocomplete
      label={label}
      variant='underlined'
      className={className}
      defaultItems={defaultItems}
      selectedKey={key}
      onSelectionChange={handleSelectionChange}
    >
      {children}
    </Autocomplete>
  );
}
