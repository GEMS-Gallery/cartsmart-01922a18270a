export const idlFactory = ({ IDL }) => {
  const ShoppingItem = IDL.Record({
    'id' : IDL.Nat,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
  });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'completeItem' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'deleteItem' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getItems' : IDL.Func([], [IDL.Vec(ShoppingItem)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
