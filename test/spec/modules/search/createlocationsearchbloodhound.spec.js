/* global geoAdminLocationSearch */
goog.require('ngeo.search.createLocationSearchBloodhound');
goog.require('ngeo.test.data.geoAdminLocationSearch');

describe('ngeo.search.createLocationSearchBloodhound', () => {

  let ngeoCreateLocationSearchBloodhound;

  beforeEach(() => {
    inject(($injector) => {
      ngeoCreateLocationSearchBloodhound = $injector.get('ngeoCreateLocationSearchBloodhound');
    });
  });

  it('Parses the features correctly', () => {
    const bloodhound = ngeoCreateLocationSearchBloodhound({
      targetProjection: ol.proj.get('EPSG:3857'),
      limit: 5
    });
    const transform = bloodhound.remote.transform;

    const features = transform(geoAdminLocationSearch);
    expect(features.length).toBe(5);

    const feature = features[0];
    expect(feature.getId(), '5586');
    expect(feature.get('label')).toBe('<i>Populated Place</i> <b>Lausanne</b> (VD) - Lausanne');
    expect(feature.get('label_no_html')).toBe('Populated Place Lausanne (VD) - Lausanne');
    expect(feature.get('label_simple')).toBe('Lausanne');

    expect(feature.getGeometry().getCoordinates()).arrayToBeCloseTo(
      [745348.9689, 5869543.2550]);
    expect(feature.get('bbox')).arrayToBeCloseTo(
      [732811.7205, 5861483.7511, 748269.0879, 5877508.3355]);
  });
});
