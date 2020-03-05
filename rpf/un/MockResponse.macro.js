const { createMacro, MacroError } = require('babel-plugin-macros');

module.exports = createMacro(function({ references, state, babel }) {
  function Assert(test, msg) {
    if (!test) {
      throw new MacroError(msg);
    }
  }
  //default template
  const defaultMocker = `Promise.resolve({
    data:%%mockData%%,
    code:"200",
    msg:"success"
  })`;
  //extract the template string from the comments
  function findGlobalMocker(body) {
    const reg = /(?<=@MockGlobal)`(.+)`/ms;
    for (const node of body) {
      const mocker = findMockerInComments(node.leadingComments, reg);
      if (mocker) {
        return mocker;
      }
    }
  }
  function findMockerInComments(leadingComments, regExp) {
    if (!leadingComments) return;
    for (let comment of leadingComments) {
      const match = regExp.exec(comment.value);
      if (match) {
        return match[1];
      }
    }
  }
  //generate the AST node from the GenericType
  function genGenericType(fakerIndentifier, id, typeParameters) {
    switch (id.name) {
      case 'Number':
        return babel.template.expression(`%%FAKER%%.random.number()`)({
          FAKER: fakerIndentifier
        });
      case 'Boolean':
        return babel.template.expression(`%%FAKER%%.random.boolean()`)({
          FAKER: fakerIndentifier
        });
      case 'String':
        return babel.template.expression(`%%FAKER%%.random.word()`)({
          FAKER: fakerIndentifier
        });
      case 'Null':
        return babel.types.nullLiteral();
      case 'undefined':
        return babel.types.unaryExpression(
          'void',
          babel.types.numericLiteral(0)
        );
      case 'Array': {
        const length =
          typeParameters.params[1] && typeParameters.params[1].value >= 0
            ? typeParameters.params[1].value
            : 1;
        const node = genCode(fakerIndentifier, typeParameters.params[0]);
        return babel.types.arrayExpression(
          Array(length)
            .fill()
            .map(() => node)
        );
      }
      case 'Object':
        return babel.types.objectExpression([]);
      default:
        throw new MacroError('Unexpected typeDef');
    }
  }
  //generate the AST node from the typeAnnotation
  function genCode(fakerIndentifier, typeDef) {
    switch (typeDef.type) {
      case 'ObjectTypeAnnotation': {
        return babel.types.objectExpression(
          typeDef.properties.map(ObjectTypeProperty => {
            return babel.types.objectProperty(
              babel.types.identifier(ObjectTypeProperty.key.name),
              genCode(fakerIndentifier, ObjectTypeProperty.value)
            );
          })
        );
      }
      case 'StringTypeAnnotation':
        return babel.template.expression(`%%FAKER%%.random.word()`)({
          FAKER: fakerIndentifier
        });
      case 'BooleanTypeAnnotation':
        return babel.template.expression(`%%FAKER%%.random.boolean()`)({
          FAKER: fakerIndentifier
        });
      case 'NumberTypeAnnotation':
        return babel.template.expression(`%%FAKER%%.random.number()`)({
          FAKER: fakerIndentifier
        });
      case 'NullLiteralTypeAnnotation':
        return babel.types.nullLiteral();
      case 'GenericTypeAnnotation': {
        return genGenericType(
          fakerIndentifier,
          typeDef.id,
          typeDef.typeParameters
        );
      }
      default:
        throw new MacroError('Unexpected typeDef');
    }
  }

  if (references.MockResponse.length > 0) {
    const globalMocker = findGlobalMocker(state.file.path.node.body);
    const defaultTemplate = babel.template.expression(
      globalMocker || defaultMocker
    );
    const fakerIndentifier = state.file.path.scope.generateUidIdentifier(
      '_faker'
    );
    const importStatement = babel.template(`import %%FAKER%% from "faker"`)({
      FAKER: fakerIndentifier
    });

    let isMockResponseUsed = false;
    references.MockResponse.forEach(function(reference) {
      Assert(
        reference.parent.type === 'GenericTypeAnnotation',
        'Must use as a generic type, eg: mockResponse<{ a: number >}'
      );

      const functionDeclaration = reference.getFunctionParent();

      const customeMocker = findMockerInComments(
        functionDeclaration.node.leadingComments,
        /(?<=@MockResponse)`(.+)`/ms,
        'debug'
      );
      let customeTemplate = undefined;
      if (customeMocker) {
        customeTemplate = babel.template.expression(customeMocker);
      }

      Assert(
        functionDeclaration &&
          functionDeclaration.get('returnType').isAncestor(reference),
        'Must use as a return type of a function, eg: function foo(): mock<{ a: number }> { }'
      );

      const GenericTypeAnnotation = reference.parentPath;
      const typeDef = GenericTypeAnnotation.get('typeParameters.params.0').node;
      const shouldMock = GenericTypeAnnotation.get('typeParameters.params.1');

      functionDeclaration.get('returnType').remove();

      if (
        shouldMock &&
        shouldMock.isBooleanLiteralTypeAnnotation({ value: false })
      ) {
        return;
      }
      isMockResponseUsed = true;
      const template = customeTemplate || defaultTemplate;

      functionDeclaration.get('body').unshiftContainer(
        'body',
        babel.types.returnStatement(
          template({
            mockData: genCode(fakerIndentifier, typeDef)
          })
        )
      );
    });
    if (isMockResponseUsed) {
      state.file.path.unshiftContainer('body', importStatement);
    }
  }
});
