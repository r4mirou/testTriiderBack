import graphqlFields from 'graphql-fields';
import { difference, union } from 'lodash';

export default class RequestedFields {
  getFields(info, options) {
    this.fields = Object.keys(graphqlFields(info));

    if (!options) return this.fields;
    this.fields = (options.keep) ? union(this.fields, options.keep) : this.fields;
    return (options.exclude) ? difference(this.fields, options.exclude) : this.fields;
  }
}
