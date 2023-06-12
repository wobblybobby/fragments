const {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  listFragments,
  deleteFragment,
} = require('../../src/model/data/memory/index.js');

describe('memory/index calls', () => {
  const data = { ownerId: 'owner', id: '1', fragment: 'Fragment 1' };

  // writeFragment
  test('writeFragment', async () => {
    await writeFragment(data);
  });

  //readFragment
  test('readFragment', async () => {
    expect(await readFragment(data.ownerId, data.id)).toEqual({
      ownerId: 'owner',
      id: '1',
      fragment: 'Fragment 1',
    });
  });

  // writeFragmentData
  test('writeFragmentData', async () => {
    await writeFragmentData(data.ownerId, data.id, 'Fragment 1 data');
  });

  // readFragmentData
  test('readFragmentData', async () => {
    expect(await readFragmentData(data.ownerId, data.id)).toEqual('Fragment 1 data');
  });

  // listFragments
  test('listFragments', async () => {
    expect(await listFragments(data.ownerId)).toEqual(['1']);

    expect(await listFragments(data.ownerId, true)).toEqual([
      { ownerId: 'owner', id: '1', fragment: 'Fragment 1' },
    ]);

    const frag = await listFragments(data.ownerId, true);
    expect(await readFragmentData(frag[0].ownerId, frag[0].id)).toEqual('Fragment 1 data');
  });

  // deleteFragment
  test('deleteFragment', async () => {
    expect(await deleteFragment(data.ownerId, data.id));

    // Check if fragment is deleted
    expect(await readFragment(data.ownerId, data.id)).toBeUndefined();
    expect(await readFragmentData(data.ownerId, data.id)).toBeUndefined();
  });
});
